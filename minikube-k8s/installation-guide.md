<h1 align="center">🖥 Minikube & kubectl Installation Guide (Windows)</h1>

<p align="center">
  <img src="https://img.shields.io/badge/OS-Windows-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Kubernetes-Local_Cluster-success?style=for-the-badge&logo=kubernetes&logoColor=white"/>
</p>

This guide walks you through installing **kubectl** and **Minikube** on Windows to run a local Kubernetes cluster.

---

# ⚠️ Prerequisites

Before installing Minikube, you MUST install:

✅ **Docker Desktop for Windows** (recommended driver)  
Download: https://www.docker.com/products/docker-desktop

Minikube needs a **container or VM driver**, and Docker Desktop provides that.

---

# 📦 Part 1 – Install kubectl

kubectl is the CLI tool used to talk to a Kubernetes cluster.

### Step 1️⃣ Install Chocolatey (Package Manager)

Open **PowerShell as Administrator** and run:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; `
[System.Net.ServicePointManager]::SecurityProtocol = `
[System.Net.ServicePointManager]::SecurityProtocol -bor 3072; `
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

---

### Step 2️⃣ Install kubectl

```powershell
choco install kubernetes-cli -y
```

---

### Step 3️⃣ Verify kubectl Installation

```powershell
kubectl version --client
```

You should see the installed client version.

---

# 🧊 Part 2 – Install Minikube

Minikube runs a **single-node Kubernetes cluster** locally.

### Step 1️⃣ Install Minikube

```powershell
choco install minikube -y
```

---

### Step 2️⃣ Start Your Kubernetes Cluster

```powershell
minikube start --driver=docker
```

This creates a local cluster using Docker.

⏳ First start may take a few minutes.

---

### Step 3️⃣ Check Cluster Status

```powershell
kubectl get nodes
```

You should see one node named `minikube`.

---

### Step 4️⃣ Check System Pods

```powershell
kubectl get pods -A
```

This shows all Kubernetes system components running.

---

# 🌐 Open Kubernetes Dashboard

```powershell
minikube dashboard
```

This opens a browser UI where you can see cluster resources visually.

---

# 🚀 Deploy Your First Application

### Create Deployment

```powershell
kubectl create deployment hello-minikube --image=kicbase/echo-server:1.0
```

---

### Expose Deployment

```powershell
kubectl expose deployment hello-minikube --type=NodePort --port=8080
```

---

### Access the Application

```powershell
minikube service hello-minikube
```

This opens the app in your browser automatically.

Alternative:

```powershell
kubectl port-forward service/hello-minikube 7080:8080
```

Visit 👉 http://localhost:7080

---

# 🛠 Managing Your Minikube Cluster

| Command | Purpose |
|---------|---------|
| `minikube pause` | Pause cluster |
| `minikube unpause` | Resume cluster |
| `minikube stop` | Stop cluster |
| `minikube delete` | Delete cluster |
| `minikube addons list` | List addons |
| `minikube dashboard` | Open dashboard |
| `minikube delete --all` | Remove all clusters |

---

# 💡 Optional: Make kubectl Use Minikube Automatically

Minikube already configures kubectl context, but you can verify:

```powershell
kubectl config current-context
```

It should show:

```
minikube
```

---

<p align="center">
  🎉 Your local Kubernetes cluster is ready!
</p>
