<h1 align="center">🪟 kind Installation & Cluster Setup Guide (Windows)</h1>

<p align="center">
  <img src="https://img.shields.io/badge/OS-Windows-blue?style=for-the-badge&logo=windows"/>
  <img src="https://img.shields.io/badge/Kubernetes-kind-success?style=for-the-badge&logo=kubernetes&logoColor=white"/>
</p>

This guide explains **how to install kind (Kubernetes IN Docker) on Windows** and create a Kubernetes cluster using Docker containers.

---

## 🧠 What is kind?

**kind (Kubernetes IN Docker)** runs Kubernetes clusters **inside Docker containers**.

- No VirtualBox or VM required  
- Each Kubernetes node runs as a Docker container  
- Extremely fast  
- Widely used in **DevOps & CI/CD pipelines**

---

## ⚠️ Prerequisites (MANDATORY)

Before starting, ensure:

✅ Windows 10 / 11 (64-bit)  
✅ Docker Desktop installed & running  
✅ WSL 2 enabled  
✅ kubectl installed  
✅ Administrator access  

Verify prerequisites:

```powershell
docker --version
kubectl version --client
```

---

## 🐳 Step 1 – Install Docker Desktop (REQUIRED)

Download Docker Desktop:

👉 https://www.docker.com/products/docker-desktop

### During Installation
- Enable **WSL 2**
- Use **Linux containers**
- Restart system if prompted

Verify Docker:

```powershell
docker ps
```

Docker must be running before continuing.

---

## 📦 Step 2 – Install kubectl (Kubernetes CLI)

### Using Chocolatey (Recommended)

Open **PowerShell as Administrator**:

```powershell
choco install kubernetes-cli -y
```

Verify:

```powershell
kubectl version --client
```

---

## 🧊 Step 3 – Install kind

Using Chocolatey:

```powershell
choco install kind -y
```

Verify:

```powershell
kind version
```

---

## 📦 Step 4 (Optional but Recommended) – Install Helm

**Helm** is the Kubernetes package manager.

```powershell
choco install kubernetes-helm -y
```

Verify:

```powershell
helm version
```

---

## 🧠 IMPORTANT CONCEPT – How kind Works on Windows

On Windows:
- kind uses **Docker Desktop + WSL 2**
- Kubernetes nodes run as **Docker containers inside WSL**
- No VirtualBox or Hyper-V VM is required

---

## 🚀 Step 5 – Create kind Cluster

```powershell
kind create cluster
```

What happens:
- Docker containers are created as Kubernetes nodes
- Control-plane node starts
- kubectl context is auto-configured

---

## 🔍 Step 6 – Verify Cluster

Check nodes:

```powershell
kubectl get nodes
```

Expected output:

```
kind-control-plane   Ready
```

Check system pods:

```powershell
kubectl get pods -A
```

Verify Docker containers:

```powershell
docker ps
```

You should see:

```
kind-control-plane
```

This confirms **Kubernetes is running inside Docker**.

---

## 🔁 Step 7 – Context Switching (If Using Minikube Also)

List contexts:

```powershell
kubectl config get-contexts
```

Switch to kind:

```powershell
kubectl config use-context kind-kind
```

Switch to minikube (if needed):

```powershell
kubectl config use-context minikube
```

---

## 🗑 Step 8 – Delete kind Cluster (Cleanup)

```powershell
kind delete cluster
```

---

## 🧠 Final Mental Model (IMPORTANT)

```
Windows
  ↓
Docker Desktop (WSL 2)
  ↓
kind
  ↓
Kubernetes Cluster (Docker containers as nodes)
```

- kind does NOT create VMs  
- Docker containers act as Kubernetes nodes  
- Ideal for CI/CD and multi-node testing  

---

<p align="center">
  🎉 kind installation and cluster setup completed successfully on Windows!
</p>
