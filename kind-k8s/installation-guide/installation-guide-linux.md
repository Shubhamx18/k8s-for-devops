<h1 align="center">🐧 kind Installation & Cluster Setup Guide (Linux)</h1>

<p align="center">
  <img src="https://img.shields.io/badge/OS-Linux-blue?style=for-the-badge&logo=linux"/>
  <img src="https://img.shields.io/badge/Kubernetes-kind-success?style=for-the-badge&logo=kubernetes&logoColor=white"/>
</p>

This guide explains **how to install kind** and **create a multi-node Kubernetes cluster using a config file**, the correct DevOps way.

---

## 🧠 What is kind?

**kind (Kubernetes IN Docker)** runs Kubernetes clusters **inside Docker containers**.

- Each Kubernetes node = Docker container  
- No virtual machines  
- Very fast startup  
- Widely used in **CI/CD pipelines & DevOps testing**

---

## ⚠️ Prerequisites (MANDATORY)

Before starting, ensure:

✅ Linux system (Ubuntu/Debian recommended)  
✅ Docker installed & running  
✅ kubectl installed  
✅ sudo privileges  

Verify:

```bash
docker --version
kubectl version --client
```

---

## 🐳 Step 1 – Install Docker (If Not Installed)

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io
```

Enable and start Docker:

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

Allow Docker without sudo  
⚠️ **Logout & login after this step**

```bash
sudo usermod -aG docker $USER
```

Verify Docker:

```bash
docker ps
```

---

## 📦 Step 2 – Install kubectl (Kubernetes CLI)

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
```

Verify:

```bash
kubectl version --client
```

---

## 🧊 Step 3 – Install kind

```bash
curl -Lo kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
chmod +x kind
sudo mv kind /usr/local/bin/kind
```

Verify:

```bash
kind version
```

---

## 🧠 IMPORTANT CONCEPT – Port Mapping in kind

In kind:
- Kubernetes cluster runs **inside Docker**
- Cluster ports ≠ Host ports

So we use **extraPortMappings** to expose services.

Example:
- `containerPort: 80` → inside cluster  
- `hostPort: 80` → accessible on your system  

---

## 📝 Step 4 – Create kind Cluster Config File

Create config file:

```bash
nano kind-config.yaml
```

### ✅ Correct Multi-Node Config (1 Control Plane + 3 Workers)

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4

nodes:
- role: control-plane
  image: kindest/node:v1.32.2
  extraPortMappings:
  - containerPort: 80
    hostPort: 80
    protocol: TCP
  - containerPort: 443
    hostPort: 443
    protocol: TCP

- role: worker
  image: kindest/node:v1.32.2

- role: worker
  image: kindest/node:v1.32.2

- role: worker
  image: kindest/node:v1.32.2
```

### 🧠 What This Config Creates

✔ 1 Control Plane  
✔ 3 Worker Nodes  
✔ HTTP & HTTPS exposed to host  

---

## 🚀 Step 5 – Create Cluster Using Config File

```bash
kind create cluster --name mycluster --config kind-config.yaml
```

---

## 🔍 Step 6 – Verify Cluster

Check Kubernetes nodes:

```bash
kubectl get nodes
```

Expected output:

```
mycluster-control-plane   Ready
mycluster-worker          Ready
mycluster-worker          Ready
mycluster-worker          Ready
```

Check Docker containers:

```bash
docker ps
```

✔ Each node is a Docker container

---

## 🔁 Step 7 – Switch Between Minikube & kind (IMPORTANT)

If you use **both Minikube and kind**:

List contexts:

```bash
kubectl config get-contexts
```

Switch to kind:

```bash
kubectl config use-context kind-mycluster
```

Switch to minikube:

```bash
kubectl config use-context minikube
```

---

## 🗑 Step 8 – Delete Cluster (Cleanup)

```bash
kind delete cluster --name mycluster
```

---

## 🧠 Final Mental Model (VERY IMPORTANT)

```
Docker
  ↓
kind
  ↓
Multi-Node Kubernetes Cluster
```

- kind = Kubernetes inside Docker  
- Config file controls nodes & ports  
- Best for DevOps testing & CI/CD  

---

<p align="center">
  🎉 kind installation and multi-node cluster setup completed successfully!
</p>
