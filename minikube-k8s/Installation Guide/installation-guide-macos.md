<h1 align="center">🍎 Minikube & kubectl Installation Guide (macOS)</h1>

<p align="center">
  <img src="https://img.shields.io/badge/OS-macOS-black?style=for-the-badge&logo=apple"/>
  <img src="https://img.shields.io/badge/Kubernetes-Local_Cluster-success?style=for-the-badge&logo=kubernetes&logoColor=white"/>
</p>

This guide helps you install **kubectl** and **Minikube** on macOS to run a local Kubernetes cluster.

---

# ⚠️ Prerequisites

Before installing Minikube, you need:

✅ macOS system  
✅ Internet connection  
✅ Admin access  
✅ Homebrew installed  
✅ Docker Desktop (recommended driver)

---

# 🍺 Step 1 – Install Homebrew (If Not Installed)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Verify:

```bash
brew --version
```

---

# 🐳 Step 2 – Install Docker Desktop

Download & install Docker Desktop from:

👉 https://www.docker.com/products/docker-desktop

Start Docker and ensure it is running before continuing.

Verify:

```bash
docker --version
```

---

# 📦 Step 3 – Install kubectl

```bash
brew install kubectl
```

Verify:

```bash
kubectl version --client
```

---

# 🧊 Step 4 – Install Minikube

```bash
brew install minikube
```

Verify:

```bash
minikube version
```

---

# 🚀 Step 5 – Start Minikube Cluster

```bash
minikube start --driver=docker
```

This creates a local Kubernetes cluster using Docker.

⏳ First start may take a few minutes.

---

# 🔍 Step 6 – Verify Cluster

Check nodes:

```bash
kubectl get nodes
```

You should see one node named **minikube**.

Check system pods:

```bash
kubectl get pods -A
```

---

# 🌐 Kubernetes Dashboard

```bash
minikube dashboard
```

Opens the Kubernetes web UI in your browser.

---

# 🚀 Deploy a Sample Application

### Create Deployment

```bash
kubectl create deployment hello-minikube --image=kicbase/echo-server:1.0
```

### Expose Deployment

```bash
kubectl expose deployment hello-minikube --type=NodePort --port=8080
```

### Access Application

```bash
minikube service hello-minikube
```

OR

```bash
kubectl port-forward service/hello-minikube 7080:8080
```

Visit 👉 http://localhost:7080

---

# 🛠 Managing Minikube Cluster

| Command | Purpose |
|---------|---------|
| `minikube pause` | Pause cluster |
| `minikube unpause` | Resume cluster |
| `minikube stop` | Stop cluster |
| `minikube delete` | Delete cluster |
| `minikube addons list` | List addons |
| `minikube delete --all` | Remove all clusters |

---

# 💡 Check Current Context

```bash
kubectl config current-context
```

It should show:

```
minikube
```

---

<p align="center">
  🎉 Your local Kubernetes cluster is now running on macOS!
</p>
