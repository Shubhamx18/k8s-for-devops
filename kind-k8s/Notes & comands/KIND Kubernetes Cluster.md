<h1 align="center">🧩 KIND Kubernetes Cluster</h1>
<h3 align="center">Running Kubernetes Locally Using KIND (Kubernetes IN Docker)</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Focus-Kubernetes-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Category-Cluster--Setup-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white">
  <img src="https://img.shields.io/badge/Type-Hands--On-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/Status-Completed-orange?style=for-the-badge">
</p>

---

## 🚀 About This Topic

To practice Kubernetes locally in a **realistic but lightweight way**, I used **KIND (Kubernetes IN Docker)**.

KIND runs Kubernetes clusters **inside Docker containers**, making it:
- Fast to create
- Easy to delete
- Perfect for learning, testing YAMLs, and experimentation

Everything written in this file is **only and exactly based on my handwritten notes and hands-on practice**, documented as one final reference.

---

## ❓ What is KIND?

**KIND** stands for **Kubernetes IN Docker**.

- Each Kubernetes node runs as a Docker container
- No virtual machines required
- Ideal for local development and learning

KIND is commonly used by:
- Developers
- DevOps engineers
- Kubernetes contributors

---

## 🧠 Why KIND Is Used

- Minikube is good for beginners
- KIND is closer to real Kubernetes behavior
- YAML files work exactly the same as production clusters

KIND allows:
- Testing Deployments, Services, Ingress, Jobs, Storage
- Creating and deleting clusters quickly
- Running multiple clusters locally

---

## ⚙️ Prerequisites

Before using KIND, the following must be installed:
- Docker
- kubectl
- KIND

Docker is mandatory because KIND runs Kubernetes nodes as Docker containers.

---

## 🔧 KIND Installation (Linux)

```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64


chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
