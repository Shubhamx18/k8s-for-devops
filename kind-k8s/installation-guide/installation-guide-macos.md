<h1 align="center">🍎 kind Installation & Cluster Setup Guide (macOS)</h1>

<p align="center">
  <img src="https://img.shields.io/badge/OS-macOS-black?style=for-the-badge&logo=apple"/>
  <img src="https://img.shields.io/badge/Kubernetes-kind-success?style=for-the-badge&logo=kubernetes&logoColor=white"/>
</p>

This guide explains **how to install kind (Kubernetes IN Docker) on macOS** and create a local Kubernetes cluster using Docker containers.

---

## 🧠 What is kind?

**kind (Kubernetes IN Docker)** runs Kubernetes clusters **inside Docker containers**.

- No VirtualBox or VM required  
- Kubernetes nodes run as Docker containers  
- Very fast startup  
- Widely used in **DevOps & CI/CD pipelines**

---

## ⚠️ Prerequisites (MANDATORY)

Before starting, ensure:

✅ macOS system (Intel or Apple Silicon)  
✅ Docker Desktop installed & running  
✅ Homebrew installed  
✅ kubectl installed  
✅ Admin access  

Verify prerequisites:

```bash
docker --version
kubectl version --client
```

---

## 🍺 Step 1 – Install Homebrew (If Not Installed)

Homebrew is the package manager for macOS.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Verify:

```bash
brew --version
```

---

## 🐳 Step 2 – Install Docker Desktop (REQUIRED)

Download Docker Desktop:

👉 https://www.docker.com/products/docker-desktop

After installation:
- Start Docker Desktop
- Allow required permissions

Verify Docker:

```bash
docker ps
```

Docker must be running before continuing.

---

## 📦 Step 3 – Install kubectl (Kubernetes CLI)

Install via Homebrew:

```bash
brew install kubectl
```

Verify:

```bash
kubectl version --client
```

---

## 🧊 Step 4 – Install kind

Install via Homebrew:

```bash
brew install kind
```

Verify:

```bash
kind version
```

---

## 📦 Step 5 (Optional but Recommended) – Install Helm

**Helm** is the Kubernetes package manager.

```bash
brew install helm
```

Verify:

```bash
helm version
```

---

## 🧠 IMPORTANT CONCEPT – How kind Works on macOS

On macOS:
- kind uses **Docker Desktop**
- Kubernetes nodes run as **Docker containers**
- No VM is exposed to the user

This makes kind **lighter and faster than Minikube**.

---

## 🚀 Step 6 – Create kind Cluster

```bash
kind create cluster
```

What happens:
- Docker containers are created as Kubernetes nodes
- Control-plane node starts
- kubectl context is auto-configured

---

## 🔍 Step 7 – Verify Cluster

Check nodes:

```bash
kubectl get nodes
```

Expected output:

```
kind-control-plane   Ready
```

Check system pods:

```bash
kubectl get pods -A
```

Verify Docker containers:

```bash
docker ps
```

You should see:

```
kind-control-plane
```

This confirms **Kubernetes is running inside Docker**.

---

## 🔁 Step 8 – Context Switching (If Using Minikube Also)

List contexts:

```bash
kubectl config get-contexts
```

Switch to kind:

```bash
kubectl config use-context kind-kind
```

Switch to minikube (if needed):

```bash
kubectl config use-context minikube
```

---

## 🗑 Step 9 – Delete kind Cluster (Cleanup)

```bash
kind delete cluster
```

---

## 🧠 Final Mental Model (IMPORTANT)

```
macOS
  ↓
Docker Desktop
  ↓
kind
  ↓
Kubernetes Cluster (Docker containers as nodes)
```

- kind does NOT create virtual machines  
- Docker containers act as Kubernetes nodes  
- Ideal for CI/CD and multi-node testing  

---

<p align="center">
  🎉 kind installation and cluster setup completed successfully on macOS!
</p>
