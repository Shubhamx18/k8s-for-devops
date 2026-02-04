<h1 align="center">🐧 Minikube & kubectl Installation Guide (Linux)</h1>

<p align="center">
  <img src="https://img.shields.io/badge/OS-Linux-blue?style=for-the-badge&logo=linux"/>
  <img src="https://img.shields.io/badge/Kubernetes-Local_Cluster-success?style=for-the-badge&logo=kubernetes&logoColor=white"/>
</p>

This guide helps you install **kubectl** and **Minikube** on Linux to run a local Kubernetes cluster.

---

# ⚠️ Prerequisites

Before installing Minikube, you need:

✅ A Linux system (Ubuntu/Debian recommended)  
✅ Internet connection  
✅ sudo privileges  
✅ Container or VM driver (**Docker recommended**)

---

# 🐳 Step 1 – Install Docker (Recommended Driver)

Update system:

```bash
sudo apt update && sudo apt upgrade -y
```

Install Docker:

```bash
sudo apt install -y docker.io
```

Enable and start Docker:

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

Allow your user to run Docker without sudo (log out & back in after this):

```bash
sudo usermod -aG docker $USER
```

Verify Docker:

```bash
docker --version
```

---

# 📦 Step 2 – Install kubectl

Download the latest kubectl binary:

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```

Make it executable:

```bash
chmod +x kubectl
```

Move to system path:

```bash
sudo mv kubectl /usr/local/bin/
```

Verify installation:

```bash
kubectl version --client
```

---

# 🧊 Step 3 – Install Minikube

Download Minikube:

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
```

Install it:

```bash
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

Verify:

```bash
minikube version
```

---

# 🚀 Step 4 – Start Minikube Cluster

```bash
minikube start --driver=docker
```

This creates a local Kubernetes cluster using Docker.

⏳ The first start may take several minutes.

---

# 🔍 Step 5 – Verify Cluster

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

This opens the Kubernetes web UI in your browser.

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
  🎉 Your local Kubernetes cluster is now running on Linux!
</p>
