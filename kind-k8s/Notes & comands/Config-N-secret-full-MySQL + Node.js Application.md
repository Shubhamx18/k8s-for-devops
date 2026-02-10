# MySQL + Node.js on Kubernetes

A working Kubernetes setup that runs a Node.js app backed by a MySQL database. Built this to get hands-on with StatefulSets, PVCs, and how services wire everything together in a real namespace.

## Stack

- **StatefulSet** — MySQL (keeps pod name and storage stable across restarts)
- **Deployment** — Node.js app (stateless, scales easily)
- **ConfigMap** — non-sensitive config (DB host, port, name)
- **Secret** — MySQL password
- **Headless Service** — stable DNS for MySQL
- **PVC** — persistent storage for MySQL data

---

## Architecture

```
Node App (Deployment)
        |
        v
MySQL Service (Headless - clusterIP: None)
        |
        v
MySQL StatefulSet (mysql-0)
        |
        v
PersistentVolume (/var/lib/mysql)
```

---

## Manifests

### 1. Namespace

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: myspace
```

---

### 2. ConfigMap

Holds non-sensitive database config shared across both MySQL and the Node app.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mysql-config
  namespace: myspace
data:
  MYSQL_DATABASE: mydatabase
  DB_HOST: mysql
  DB_PORT: "3306"
```

---

### 3. Secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysql-secret
  namespace: myspace
type: Opaque
stringData:
  MYSQL_ROOT_PASSWORD: root
```

> Don't commit real passwords. Use Sealed Secrets or an external vault in production.

---

### 4. MySQL Headless Service

`clusterIP: None` skips load balancing and gives the StatefulSet pod a stable DNS entry:

```
mysql-0.mysql.myspace.svc.cluster.local
```

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql
  namespace: myspace
spec:
  clusterIP: None
  selector:
    app: mysql
  ports:
    - port: 3306
```

---

### 5. MySQL StatefulSet

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
  namespace: myspace
spec:
  serviceName: mysql
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
        - name: mysql
          image: mysql:8.0
          ports:
            - containerPort: 3306
          envFrom:
            - configMapRef:
                name: mysql-config
          env:
            - name: MYSQL_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-secret
                  key: MYSQL_ROOT_PASSWORD
          volumeMounts:
            - name: mysql-data
              mountPath: /var/lib/mysql
  volumeClaimTemplates:
    - metadata:
        name: mysql-data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 1Gi
```

---

### 6. Node.js Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-app
  namespace: myspace
spec:
  replicas: 1
  selector:
    matchLabels:
      app: node-app
  template:
    metadata:
      labels:
        app: node-app
    spec:
      containers:
        - name: node-app
          image: shubhamm18/diffpods:01
          ports:
            - containerPort: 3000
          env:
            - name: DB_HOST
              valueFrom:
                configMapKeyRef:
                  name: mysql-config
                  key: DB_HOST
            - name: DB_PORT
              valueFrom:
                configMapKeyRef:
                  name: mysql-config
                  key: DB_PORT
            - name: DB_NAME
              valueFrom:
                configMapKeyRef:
                  name: mysql-config
                  key: MYSQL_DATABASE
            - name: DB_USER
              value: root
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-secret
                  key: MYSQL_ROOT_PASSWORD
```

---

### 7. Node.js Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: node-app-service
  namespace: myspace
spec:
  type: ClusterIP
  selector:
    app: node-app
  ports:
    - port: 3000
      targetPort: 3000
```

---

## Deploy

Apply in this order — resources need to exist before things that depend on them:

```bash
kubectl apply -f namespace.yaml
kubectl apply -f mysql-config.yaml
kubectl apply -f mysql-secret.yaml
kubectl apply -f mysql-service.yaml
kubectl apply -f mysql-statefulset.yaml
kubectl apply -f node-app-deployment.yaml
kubectl apply -f node-app-service.yaml
```

Or if you have everything in one file:

```bash
kubectl apply -f k8s-complete.yaml
```

Check everything came up:

```bash
kubectl get all -n myspace
```

---

## Notes

- MySQL runs as a StatefulSet so the pod name (`mysql-0`) and PVC stay stable across restarts
- The Node app connects via the service name `mysql` on port `3306` — Kubernetes DNS resolves it internally
- Data lives in the PVC, so deleting the pod won't wipe the database
- Node image pulls from my Docker Hub (`shubhamm18/diffpods:01`) — swap it out for your own build
