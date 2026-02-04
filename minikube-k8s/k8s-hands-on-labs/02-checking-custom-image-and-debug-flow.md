<h1 align="center">🧠 Custom Image Deployment & Debugging Flow (Minikube)</h1>

This guide explains how to verify your own Docker image, deploy it in Kubernetes, and debug it step by step.

---

# 🔍 PART 1 — Check Exposed Port of Your Own Docker Image

If you want to know which port your image exposes:

### Step 1 — Login to Minikube Node

```bash
minikube ssh
```

### Step 2 — List Images Inside Node

```bash
crictl images
```

### Step 3 — Inspect Your Image

```bash
crictl inspecti <image-name>:<tag>
```

Example:

```bash
crictl inspecti shubham18/yourimage:v1
```

Look for:

```
"ExposedPorts": {
   "3000/tcp": {}
}
```

This tells you the container port.

Exit node:

```bash
exit
```

---

# 📦 PART 2 — If Image Exists Only On Your Local System

Load it into Minikube:

```bash
minikube image load myapp:v1
```

---

# 🚀 PART 3 — Create Deployment Using Your Image

```bash
kubectl create deployment myapp-deployment --image=myapp:v1
```

Check:

```bash
kubectl get deployments
kubectl get pods
```

---

# 🌐 PART 4 — Expose the Application

Use the port you found earlier.

```bash
kubectl expose deployment myapp-deployment \
  --type=NodePort \
  --port=80 \
  --target-port=3000
```

| Flag | Meaning |
|------|---------|
| `--type=NodePort` | Makes service accessible outside cluster |
| `--port` | Service port |
| `--target-port` | Container port inside pod |

---

# 🔎 PART 5 — Check Service

```bash
kubectl get svc
```

Access app:

```bash
minikube service myapp-deployment
```

---

# 🖥 PART 6 — Edit Image from Dashboard

```bash
minikube dashboard
```

Go to:
Workloads → Deployment → Select Deployment → Edit → Change image version → Update

---

# 📜 PART 7 — Check Logs of Pod

```bash
kubectl get pods
kubectl logs <pod-name>
```

Live logs:

```bash
kubectl logs -f <pod-name>
```

---

# 🔍 PART 8 — Describe Pod for Deep Debugging

```bash
kubectl describe pod <pod-name>
```

Shows:
✔ Events  
✔ Errors  
✔ Image details  
✔ Container state  

---

# 🗑 PART 9 — Delete Resources

```bash
kubectl delete service myapp-deployment
kubectl delete deployment myapp-deployment
```

---

# 🧠 SUMMARY FLOW

```
Check Image Port → Load Image → Create Deployment
        ↓
Expose Service → Access App → Debug via Logs
        ↓
Edit via Dashboard → Describe Pod → Delete Resources
```

---

<p align="center">
  🎯 You now know how to verify, deploy, expose, and debug your own Docker images in Kubernetes.
</p>
