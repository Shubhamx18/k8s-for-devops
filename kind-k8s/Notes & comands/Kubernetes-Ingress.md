<h1 align="center">🌐 Kubernetes Ingress</h1>
<h3 align="center">External Access to Services — Routing Traffic the Right Way</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Focus-Kubernetes-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Category-Networking-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white">
  <img src="https://img.shields.io/badge/Type-Hands--On-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/Status-Completed-orange?style=for-the-badge">
</p>

---

## 🚀 About This Topic

Ingress is used to **expose applications running inside a Kubernetes cluster to the outside world** using **HTTP and HTTPS**.

Instead of exposing every Service separately using NodePort or LoadBalancer, Ingress provides a **single entry point** that can route traffic to multiple services based on:
- URL path
- Hostname (domain)

Everything written in this file is **only and exactly based on my handwritten notes and hands-on practice**, documented as one final reference.

---

## 🌐 What is Ingress?

Ingress is a Kubernetes object that manages **external access** to services inside the cluster.

Ingress works at **Layer 7 (HTTP/HTTPS)** and acts like a **reverse proxy / load balancer**.

---

## ❓ Why Ingress Is Needed

- Exposing every service using NodePort is not scalable
- Managing multiple ports is difficult
- Production applications use domain-based routing

Ingress solves this by:
- Providing a single external access point
- Routing traffic internally to the correct Service
- Supporting path-based and host-based routing

---

## ⚙️ Ingress Controller

Ingress **does not work alone**.

An **Ingress Controller** is required to:
- Watch Ingress resources
- Apply routing rules
- Forward traffic to Services

Example:
- NGINX Ingress Controller

Without an Ingress Controller:
- Ingress rules exist
- But traffic will not be routed

---


---

## 🚪 Ports Used

- HTTP → Port 80
- HTTPS → Port 443

---

## 📌 Key Components In Ingress

- Ingress Controller
- Ingress Resource
- Service
- Pods

Ingress never talks to Pods directly — it always goes through a **Service**.

---

## 📄 YAML FILE EXAMPLES (AS PRACTICED)

### 1️⃣ Ingress Resource YAML (Path-Based Routing)

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  namespace: myspace
spec:
  rules:
  - http:
      paths:
      - path: /student
        pathType: Prefix
        backend:
          service:
            name: student-service
            port:
              number: 80


Service YAML (Target for Ingress)
apiVersion: v1
kind: Service
metadata:
  name: student-service
  namespace: myspace
spec:
  selector:
    app: student
  ports:
  - port: 80
    targetPort: 8080
  type: ClusterIP


Deployment YAML (Pods Behind Service)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: student-deployment
  namespace: myspace
spec:
  replicas: 2
  selector:
    matchLabels:
      app: student
  template:
    metadata:
      labels:
        app: student
    spec:
      containers:
      - name: student-app
        image: nginx
        ports:
        - containerPort: 8080
