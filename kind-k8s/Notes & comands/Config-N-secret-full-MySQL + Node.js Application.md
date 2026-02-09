# 🚀 MySQL + Node.js Application on Kubernetes (Complete Working Setup)

This document contains a **complete, real‑world Kubernetes setup** using:

* **StatefulSet** → MySQL (database)
* **Deployment** → Node.js web application
* **ConfigMap** → non‑sensitive configuration
* **Secret** → sensitive data (password)
* **Service** → internal networking
* **PVC** → persistent MySQL data

Everything is written in **one place**, ready to understand, revise, or push to GitHub.

---

## 🧠 Architecture Overview

```
Node App (Deployment)
        |
        v
MySQL Service (ClusterIP / Headless)
        |
        v
MySQL StatefulSet
        |
        v
Persistent Volume (PVC)
```

---

## 📁 Namespace (Optional but Recommended)

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: myspace
```

---

## 📄 1. ConfigMap – Application & Database Configuration

**Purpose:**

* Stores **non‑sensitive configuration**
* Reusable across MySQL and Node app

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

**Why ConfigMap?**

* No hardcoding inside images
* Same image works in dev / prod
* Easy to update configuration

---

## 📄 2. Secret – MySQL Password

**Purpose:**

* Stores **sensitive data** securely

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

**Why Secret?**

* Passwords should never be in ConfigMap or GitHub
* Kubernetes best practice

---

## 📄 3. MySQL Headless Service

**Purpose:**

* Provides **stable DNS** for MySQL StatefulSet
* Required for StatefulSet networking

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

**Key Point:**

* `clusterIP: None` → No load balancing
* MySQL pod DNS example:

  ```
  mysql-0.mysql.myspace.svc.cluster.local
  ```

---

## 📄 4. MySQL StatefulSet (Database)

**Purpose:**

* Runs MySQL safely
* Ensures **fixed pod name** and **persistent data**

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

**Why StatefulSet?**

* Pod name never changes (`mysql-0`)
* Each pod gets its **own PVC**
* Data survives pod restarts

---

## 📄 5. Node.js Application Deployment

**Purpose:**

* Runs the web application
* Connects to MySQL via Service

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

**Why Deployment here?**

* Web app is stateless
* Easy scaling
* No local data needed

---

## 📄 6. Node.js Service

**Purpose:**

* Internal access to Node app
* Stable networking

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

## ▶ Apply Everything (Correct Order)

```bash
kubectl apply -f namespace.yaml
kubectl apply -f mysql-config.yaml
kubectl apply -f mysql-secret.yaml
kubectl apply -f mysql-service.yaml
kubectl apply -f mysql-statefulset.yaml
kubectl apply -f node-app-deployment.yaml
kubectl apply -f node-app-service.yaml
```

---

## 🔄 Runtime Flow (How Everything Works Together)

1. ConfigMap & Secret are loaded
2. MySQL Service creates stable DNS
3. MySQL StatefulSet starts `mysql-0`
4. PVC is attached to `/var/lib/mysql`
5. MySQL reads config + password
6. Node app starts
7. Node app reads DB config
8. App connects to `mysql:3306`
9. Data stored safely in PVC

---

## 🧠 Core Kubernetes Rules (Remember Forever)

| Component   | Purpose            |
| ----------- | ------------------ |
| ConfigMap   | Configuration      |
| Secret      | Passwords / tokens |
| PVC         | Data               |
| StatefulSet | Databases          |
| Deployment  | Applications       |
| Service     | Networking         |

---

## 🏁 Final Summary

✔ Database data is safe
✔ Configuration is externalized
✔ Passwords are secure
✔ App and DB are properly separated
✔ This is **real production‑style Kubernetes**

---
