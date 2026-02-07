# 🌐 Kubernetes Ingress

### External Access to Services — Routing Traffic the Right Way

<p align="center">
  <img src="https://img.shields.io/badge/Focus-Kubernetes-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Category-Networking-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white" />
  <img src="https://img.shields.io/badge/Type-Hands--On-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Completed-orange?style=for-the-badge" />
</p>

---

## 🚀 About This Topic

In Kubernetes, applications run **inside the cluster**, but users access them **from outside**.

Ingress is used to **expose multiple services externally using HTTP/HTTPS** through a **single entry point**.

Instead of exposing every Service with `NodePort` or `LoadBalancer`, Ingress provides:

* 🌐 Path‑based routing (`/student`, `/admin`)
* 🌍 Host‑based routing (`app.example.com`)
* 🔐 TLS / HTTPS support

This document is a **clean, final reference** based purely on **hands‑on practice and learning notes**.

---

## 🌐 What is Ingress?

An **Ingress** is a Kubernetes object that:

* Manages **external HTTP/HTTPS traffic**
* Routes traffic to **internal Services**
* Works at **Layer 7 (Application layer)**

Ingress acts like a **reverse proxy** for your cluster.

⚠️ Ingress **never talks to Pods directly** — it always forwards traffic to a **Service**.

---

## ❓ Why Ingress Is Needed

Without Ingress:

* Each service needs its own NodePort
* Many ports must be exposed
* No domain‑based routing

Ingress solves this by:

* Providing **one external entry point**
* Routing traffic internally
* Making production networking clean and scalable

---

## ⚙️ Ingress Controller (VERY IMPORTANT)

Ingress **does not work by itself**.

An **Ingress Controller** is required to:

* Watch Ingress resources
* Apply routing rules
* Handle incoming traffic

### Common Ingress Controllers:

* NGINX Ingress Controller (most common)
* Traefik
* HAProxy
* Cloud‑provider controllers

❌ Without an Ingress Controller:

* Ingress YAML exists
* But traffic is **not routed**

---

## 🚪 Ports Used by Ingress

| Protocol | Port |
| -------- | ---- |
| HTTP     | 80   |
| HTTPS    | 443  |

Ingress listens on these ports and forwards traffic internally.

---

## 🧩 Key Components in Ingress Flow

```
User → Ingress Controller → Ingress Rules → Service → Pods
```

| Component          | Role                   |
| ------------------ | ---------------------- |
| Ingress Controller | Entry point            |
| Ingress Resource   | Routing rules          |
| Service            | Internal load balancer |
| Pods               | Application containers |

---

## 🧠 Types of Routing Supported

### 1️⃣ Path‑Based Routing

```
example.com/student → student-service
example.com/admin   → admin-service
```

### 2️⃣ Host‑Based Routing

```
student.example.com → student-service
admin.example.com   → admin-service
```

---

## 📄 Ingress Example – Path‑Based Routing

### Ingress Resource

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
```

---

## 📄 Service (Target for Ingress)

```yaml
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
```

---

## 📄 Deployment (Pods Behind Service)

```yaml
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
```

---

## 🔄 Complete Traffic Flow (Step‑by‑Step)

1. User accesses `http://<ingress-ip>/student`
2. Request reaches **Ingress Controller**
3. Ingress rule matches `/student`
4. Traffic is forwarded to `student-service`
5. Service load‑balances traffic
6. One Pod receives the request

---

## 📌 Common Ingress Commands

```bash
kubectl get ingress -n myspace
kubectl describe ingress my-ingress -n myspace
kubectl get svc -n myspace
kubectl get pods -n myspace
```

---

## ❌ Common Mistakes (Very Important)

* Creating Ingress without controller ❌
* Expecting Ingress to work like NodePort ❌
* Forgetting Service in between ❌
* Assuming Ingress gives TCP support ❌

Ingress supports **HTTP/HTTPS only**.

---

## 🧠 Ingress vs NodePort vs LoadBalancer

| Feature           | NodePort | LoadBalancer | Ingress |
| ----------------- | -------- | ------------ | ------- |
| External access   | Yes      | Yes          | Yes     |
| Multiple services | ❌        | ❌            | ✅       |
| Domain routing    | ❌        | ❌            | ✅       |
| HTTPS             | ❌        | ❌            | ✅       |
| Production ready  | ❌        | ⚠️           | ✅       |

---

## 🏁 Final Takeaway

> **Ingress provides a clean, scalable, and production‑ready way to expose Kubernetes services externally using HTTP/HTTPS.**

It is essential for:

* Web applications
* Microservices routing
* Domain‑based access

---

📌 This document is suitable for:

* README.md
* Kubernetes networking notes
* Interview preparation
* GitHub documentation

---

### 🔜 Next Recommended Topics

* NGINX Ingress installation (KIND)
* TLS / HTTPS with Ingress
* Host‑based routing examples
* Ingress annotations

---

✅ **Status: Complete, Clean & Production‑Ready Notes**
