<h1 align="center">🚀 Kubernetes Hands-On Lab: From Deployment to Dashboard</h1>

This lab walks you through deploying your own container image, exposing it, accessing it, and monitoring it using the Kubernetes Dashboard.

---

# 🧱 Step 1 — Use Your Own Docker Image

Before Kubernetes, make sure your image exists on Docker Hub:

```bash
docker build -t yourdockerhubusername/myapp:v1 .
docker push yourdockerhubusername/myapp:v1
```

---

# 📦 Step 2 — Create Deployment

A **Deployment** ensures Pods are running and can scale.

```bash
kubectl create deployment my-app --image=yourdockerhubusername/myapp:v1
```

Check deployment:

```bash
kubectl get deployments
kubectl describe deployment my-app
```

---

# 📦 Step 3 — Check Pods Created by Deployment

```bash
kubectl get pods
```

Detailed info:

```bash
kubectl describe pod <pod-name>
```

Check container logs:

```bash
kubectl logs <pod-name>
```

---

# 🌐 Step 4 — Expose Deployment as a Service

We need to make the app accessible.

### Command Format

```bash
kubectl expose deployment <app-name> \
  --type=NodePort \
  --port=80 \
  --target-port=3000
```

### What Each Flag Means

| Option | Meaning |
|-------|---------|
| `--type=NodePort` | Exposes service outside cluster |
| `--port` | Service port |
| `--target-port` | Container port inside Pod |

👉 Use **target-port = the port your app runs on inside the container**

Example:

```bash
kubectl expose deployment my-app --type=NodePort --port=80 --target-port=3000
```

---

# 🔎 Step 5 — Check Service

```bash
kubectl get services
```

You will see a **NodePort** assigned like `30007`.

---

# 🌍 Step 6 — Access the Application

Using Minikube:

```bash
minikube service my-app
```

OR manually:

```bash
minikube ip
```

Then open:

```
http://<minikube-ip>:<nodeport>
```

---

# 📊 Step 7 — Scale Application

```bash
kubectl scale deployment my-app --replicas=3
```

Check Pods:

```bash
kubectl get pods
```

---

# 🔄 Step 8 — Update Application Image

```bash
kubectl set image deployment/my-app my-app=yourdockerhubusername/myapp:v2
```

Check rollout:

```bash
kubectl rollout status deployment/my-app
```

---

# 🖥 Step 9 — Open Kubernetes Dashboard

```bash
minikube dashboard
```

In Dashboard you can:

✔ View Deployments  
✔ View Pods  
✔ Check logs  
✔ Scale replicas  
✔ Monitor health  

---

# 🔍 Step 10 — Debugging Commands

| Command | Purpose |
|--------|---------|
| `kubectl get all` | Show all resources |
| `kubectl describe pod <pod>` | Pod details |
| `kubectl logs <pod>` | View logs |
| `kubectl exec -it <pod> -- bash` | Enter container |

---

# 🗑 Step 11 — Delete Resources

Delete service:

```bash
kubectl delete service my-app
```

Delete deployment:

```bash
kubectl delete deployment my-app
```

Delete everything:

```bash
kubectl delete all --all
```

---

# 🧠 Summary Flow

```
Build Image → Push to Docker Hub
        ↓
Create Deployment
        ↓
Pods Created
        ↓
Expose Service (NodePort)
        ↓
Access Application
        ↓
Monitor in Dashboard
        ↓
Scale / Update
        ↓
Delete Resources
```

---

<p align="center">
  🎯 You now know how to deploy, expose, monitor, and manage an app in Kubernetes!
</p>
