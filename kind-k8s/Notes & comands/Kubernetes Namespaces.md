<h1 align="center">🗂️ Kubernetes Namespaces</h1>
<h3 align="center">Logical Isolation & Resource Organization in Kubernetes</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Focus-Kubernetes-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Category-Core--Concepts-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white">
  <img src="https://img.shields.io/badge/Type-Hands--On-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/Status-Completed-orange?style=for-the-badge">
</p>

---

## 🚀 About This Topic

In Kubernetes, as applications and resources grow, managing everything in a **single space becomes difficult**.

To solve this problem, Kubernetes provides **Namespaces**, which allow logical separation of resources inside the same cluster.

Everything written in this file is **only and exactly based on my handwritten notes and hands-on practice**, documented as one complete and final reference.

---

## 🧠 What is a Namespace?

A **Namespace** is a logical partition inside a Kubernetes cluster.

- It is used to **group resources**
- Helps in **resource isolation**
- Allows better **management and control**

A single Kubernetes cluster can have **multiple namespaces**.

---

## ❓ Why Namespaces Are Needed

- Large clusters contain many applications
- Different teams may share the same cluster
- Resources need logical separation
- Name conflicts must be avoided

Namespaces help by:
- Separating environments (dev, test, prod)
- Organizing resources clearly
- Improving security and management

---

## 📦 Default Namespaces in Kubernetes

When a cluster is created, Kubernetes provides some default namespaces:

- `default` → Resources created without specifying a namespace
- `kube-system` → System components
- `kube-public` → Publicly accessible data
- `kube-node-lease` → Node heartbeat information

---

## 🔁 How Namespaces Work

- Resources like Pods, Services, Deployments exist **inside namespaces**
- Same resource names can exist in different namespaces
- Namespaces do not provide network isolation by default

---

## 📌 Commands Used (from notes only)

Create Namespace  
  kubectl create namespace myspace  

List Namespaces  
  kubectl get ns  

Create resource in a namespace  
  kubectl apply -f file.yml -n myspace  

Get Pods from a namespace  
  kubectl get pods -n myspace  

---

## 📄 YAML FILE EXAMPLE (AS PRACTICED)

### Namespace YAML Example

```yaml

Using Namespace in Resource YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-deployment
  namespace: myspace
spec:
  replicas: 2
  selector:
    matchLabels:
      app: demo-app
  template:
    metadata:
      labels:
        app: demo-app
    spec:
      containers:
      - name: demo-container
        image: nginx
