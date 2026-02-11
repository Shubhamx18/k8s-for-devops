# Kubernetes Cheat Sheet

A comprehensive reference guide for Kubernetes resources and configurations.

---

## Core Workload Resources

### 1. Pod

The smallest deployable unit in Kubernetes. It can hold one or more containers.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
    - name: my-container
      image: nginx:latest
      ports:
        - containerPort: 80
```

**Use Case:** Minimal example of a running pod with a single NGINX container on port 80.

---

### 2. ReplicaSet

Ensures a specified number of identical Pods are running at all times.

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: my-replicaset
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: nginx
          image: nginx
```

**Use Case:** Maintains 3 identical pod replicas for high availability.

---

### 3. Deployment

Provides declarative updates for Pods and ReplicaSets.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: my-container
          image: nginx:latest
          ports:
            - containerPort: 80
```

**Features:**
- Creates and manages 3 replicas of your pod
- Automatically replaces unhealthy pods for high availability
- Supports rolling updates and rollbacks

---

### 4. StatefulSet

Used for stateful applications that require stable, unique network identities and persistent storage.

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: my-statefulset
spec:
  selector:
    matchLabels:
      app: stateful
  serviceName: "stateful-service"
  replicas: 2
  template:
    metadata:
      labels:
        app: stateful
    spec:
      containers:
        - name: stateful-container
          image: mysql
```

**Use Case:** Databases, message queues, and applications requiring stable network identities.

---

### 5. DaemonSet

Ensures that a pod runs on every node in the cluster.

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: my-daemonset
spec:
  selector:
    matchLabels:
      app: daemon
  template:
    metadata:
      labels:
        app: daemon
    spec:
      containers:
        - name: daemon-container
          image: busybox
          command: ["sleep", "3600"]
```

**Use Case:** Log collectors, monitoring agents, node-level services.

---

## Service & Networking

### 6. Service (ClusterIP)

Exposes your app on an internal IP address in the cluster.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
```

**Use Case:** Internal service that allows stable access to pods within the cluster.

---

### 7. Service (NodePort)

Exposes your app on a static port on each Node's IP.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-nodeport-service
spec:
  type: NodePort
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30009
```

**Use Case:** External access to services without a load balancer.

---

### 8. Service (LoadBalancer)

Exposes your app to the internet via a cloud provider's load balancer.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-loadbalancer
spec:
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

**Use Case:** Production-grade external access with cloud provider integration.

---

### 9. Ingress

Manages external access to services, typically HTTP/HTTPS.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  rules:
    - host: myapp.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-service
                port:
                  number: 80
```

**Use Case:** Routes external HTTP traffic to internal services using domain names. Often used with Ingress controllers (nginx, traefik).

---

### 10. NetworkPolicy

Controls how groups of Pods communicate with each other and external endpoints.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-http
spec:
  podSelector:
    matchLabels:
      app: my-app
  policyTypes:
    - Ingress
  ingress:
    - from:
        - ipBlock:
            cidr: 192.168.1.0/24
      ports:
        - protocol: TCP
          port: 80
```

**Use Case:** Restricts network access to specific IP ranges. Crucial for securing internal communication.

---

### 11. Endpoints (Manual)

Defines manually specified network endpoints for a Service.

```yaml
apiVersion: v1
kind: Endpoints
metadata:
  name: my-endpoints
subsets:
  - addresses:
      - ip: 10.10.1.1
    ports:
      - port: 80
```

**Use Case:** Custom service endpoints for external databases or legacy systems.

---

## Configuration & Storage

### 12. ConfigMap

Stores non-sensitive configuration data to be used by applications.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-config
data:
  key1: "value1"
  key2: "value2"
```

**Use Case:** Environment variables, configuration files mounted into pods.

---

### 13. Secret

Stores sensitive information such as passwords, tokens, or keys.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-secret
type: Opaque
data:
  username: dXNlcg==       # base64 encoded "user"
  password: cGFzc3dvcmQ=   # base64 encoded "password"
```

**Use Case:** Secure storage of credentials, API keys, certificates.

---

### 14. PersistentVolume (PV)

A piece of storage in the cluster provisioned by an admin.

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-pv
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/mnt/data"
```

**Use Case:** Defines persistent storage for data persistence across pod restarts.

---

### 15. PersistentVolumeClaim (PVC)

Requests storage from an available PersistentVolume.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 500Mi
```

**Use Case:** Pods use PVCs to mount persistent storage.

---

### 16. Volume (EmptyDir)

Temporary volume that exists as long as the Pod exists.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: volume-pod
spec:
  containers:
    - name: busybox
      image: busybox
      command: ["sleep", "3600"]
      volumeMounts:
        - name: temp-storage
          mountPath: /data
  volumes:
    - name: temp-storage
      emptyDir: {}
```

**Use Case:** Temporary storage for cache, scratch space, or sharing data between containers in a pod.

---

## Scheduling & Scaling

### 17. Job

Runs a one-time task or batch job that executes and exits.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: my-job
spec:
  template:
    spec:
      containers:
        - name: job-container
          image: busybox
          command: ["echo", "Hello Kubernetes"]
      restartPolicy: Never
```

**Use Case:** Batch processing, database migrations, cleanup tasks.

---

### 18. CronJob

Runs a scheduled task on a recurring schedule.

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: my-cronjob
spec:
  schedule: "*/5 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: cron-container
              image: busybox
              command: ["echo", "Scheduled Task"]
          restartPolicy: OnFailure
```

**Use Case:** Scheduled backups, reports, cleanup tasks. Similar to Unix cron.

---

### 19. HorizontalPodAutoscaler (HPA)

Automatically scales the number of pods based on CPU/memory usage.

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-deployment
  minReplicas: 2
  maxReplicas: 5
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 50
```

**Use Case:** Automatically scales pods between 2-5 replicas based on 50% CPU utilization.

---

### 20. PodDisruptionBudget (PDB)

Ensures a minimum number of pods stay available during voluntary disruptions.

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: my-pdb
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app: my-app
```

**Use Case:** Maintains availability during node upgrades, cluster maintenance.

---

## Security & Access Control

### 21. Namespace

Provides a mechanism for isolating groups of resources within a cluster.

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: my-namespace
```

**Use Case:** Multi-tenancy, environment separation (dev, staging, prod).

---

### 22. ServiceAccount

Provides an identity for processes running in a Pod to interact with the Kubernetes API.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-service-account
```

**Use Case:** Pod authentication to Kubernetes API or external services.

---

### 23. Role

Defines permissions within a namespace.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: my-namespace
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "watch", "list"]
```

**Use Case:** Namespace-scoped permissions for reading pods.

---

### 24. RoleBinding

Grants a Role to a user or service account within a namespace.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: my-namespace
subjects:
  - kind: ServiceAccount
    name: my-service-account
    namespace: my-namespace
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

**Use Case:** Binds the pod-reader role to a service account.

---

### 25. ClusterRole

Defines permissions across the entire cluster.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: cluster-admin-role
rules:
  - apiGroups: ["*"]
    resources: ["*"]
    verbs: ["*"]
```

**Use Case:** Cluster-wide permissions for admin operations.

---

### 26. ClusterRoleBinding

Binds a ClusterRole to a user or group at the cluster level.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: cluster-admin-binding
subjects:
  - kind: User
    name: admin
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: cluster-admin-role
  apiGroup: rbac.authorization.k8s.io
```

**Use Case:** Grants cluster-wide admin access to a user.

---

## Resource Management

### 27. ResourceQuota

Manages resource usage per namespace.

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: my-quota
  namespace: my-namespace
spec:
  hard:
    pods: "10"
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "10"
    limits.memory: 16Gi
```

**Use Case:** Prevents resource exhaustion by limiting namespace resource consumption.

---

### 28. LimitRange

Sets default resource requests and limits for pods and containers in a namespace.

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: resource-limits
  namespace: my-namespace
spec:
  limits:
    - default:
        cpu: 500m
        memory: 512Mi
      defaultRequest:
        cpu: 200m
        memory: 256Mi
      type: Container
```

**Use Case:** Enforces default resource constraints for all containers in a namespace.

---

## Quick Reference

### Common kubectl Commands

```bash
# Get resources
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get all

# Describe resources
kubectl describe pod <pod-name>
kubectl describe deployment <deployment-name>

# Create resources
kubectl apply -f <file.yaml>
kubectl create -f <file.yaml>

# Delete resources
kubectl delete pod <pod-name>
kubectl delete -f <file.yaml>

# Logs and debugging
kubectl logs <pod-name>
kubectl logs -f <pod-name>  # Follow logs
kubectl exec -it <pod-name> -- /bin/bash

# Scale deployments
kubectl scale deployment <name> --replicas=5

# Update deployments
kubectl set image deployment/<name> <container>=<new-image>
kubectl rollout status deployment/<name>
kubectl rollout undo deployment/<name>
```

---

## Access Modes

| Mode | Description |
|------|-------------|
| `ReadWriteOnce` (RWO) | Volume can be mounted read-write by a single node |
| `ReadOnlyMany` (ROX) | Volume can be mounted read-only by many nodes |
| `ReadWriteMany` (RWX) | Volume can be mounted read-write by many nodes |

---
