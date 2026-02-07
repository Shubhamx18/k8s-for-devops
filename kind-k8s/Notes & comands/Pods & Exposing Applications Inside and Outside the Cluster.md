# 🔗 Kubernetes Services

### Connecting Pods & Exposing Applications Inside and Outside the Cluster

<p align="center">
  <img src="https://img.shields.io/badge/Focus-Kubernetes-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Category-Networking-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white" />
  <img src="https://img.shields.io/badge/Type-Hands--On-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Completed-orange?style=for-the-badge" />
</p>

---

## 🚀 About This Topic

In Kubernetes, **Pods are ephemeral**:

* They can be deleted anytime
* They get new IPs when recreated
* Clients cannot rely on Pod IPs

To solve this problem, Kubernetes introduces **Services** — a stable networking abstraction.

This document is a **clean, complete, production‑ready reference** based on **hands‑on practice and real cluster behavior**.

---

## 🌐 What is a Service?

A **Service** is a Kubernetes object that:

* Provides a **stable virtual IP (ClusterIP)**
* Gives a **DNS name** for accessing Pods
* Load‑balances traffic across multiple Pods

A Service uses **label selectors** to find the Pods it should send traffic to.

---

## ❓ Why Services Are Needed

Without Services:

* Pod IPs change frequently ❌
* Manual Pod discovery is required ❌
* No built‑in load balancing ❌

Services solve this by:

* Acting as a permanent access point
* Automatically routing traffic to healthy Pods
* Decoupling clients from Pod lifecycle

---

## 🔁 How Service → Pod Communication Works

```
Client → Service (VIP/DNS) → Pod(s)
```

Important points:

* Service never sends traffic randomly
* It always selects Pods using **labels**
* kube‑proxy manages traffic routing

---

## 🧩 Types of Kubernetes Services

---

### 1️⃣ ClusterIP (Default)

**Purpose:** Internal communication only

* Accessible **inside the cluster**
* Default Service type
* Used for backend services & databases

**Example use cases:**

* Web app → database
* Microservice → microservice

---

### 2️⃣ NodePort

**Purpose:** Simple external access

* Exposes Service on each Node’s IP
* Uses port range **30000–32767**
* Accessible from outside the cluster

**Access format:**

```text
<NodeIP>:<NodePort>
```

⚠️ Not recommended for production

---

### 3️⃣ LoadBalancer

**Purpose:** Production‑grade external access (cloud)

* Creates cloud load balancer
* Assigns public IP automatically
* Used in AWS / GCP / Azure

---

## 🧠 Service Types – Quick Comparison

| Feature         | ClusterIP | NodePort | LoadBalancer |
| --------------- | --------- | -------- | ------------ |
| Internal access | ✅         | ✅        | ✅            |
| External access | ❌         | ✅        | ✅            |
| Cloud required  | ❌         | ❌        | ✅            |
| Production use  | ✅         | ❌        | ✅            |

---

## 🚪 `kubectl expose` Command

The `kubectl expose` command quickly creates a Service for an existing resource.

### Example:

```bash
kubectl expose deployment my-deployment \
  --type=NodePort \
  --port=80
```

⚠️ Useful for learning & debugging, not production YAML.

---

## 🔀 Port Forwarding (Debugging Tool)

Port forwarding allows temporary local access **without creating a Service**.

### Common use cases:

* Debugging
* Local testing
* DB access

### Examples:

```bash
kubectl port-forward pod/mypod 8080:80
kubectl port-forward svc/my-service 8080:80
```

Traffic flow:

```text
Local Machine → Pod / Service
```

---

## 📄 Service YAML Examples

---

### 1️⃣ ClusterIP Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-clusterip-service
  namespace: myspace
spec:
  selector:
    app: demo-app
  ports:
  - port: 80
    targetPort: 8080
  type: ClusterIP
```

---

### 2️⃣ NodePort Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-nodeport-service
  namespace: myspace
spec:
  selector:
    app: demo-app
  ports:
  - port: 80
    targetPort: 8080
    nodePort: 30007
  type: NodePort
```

---

## 📄 Deployment (Pods Behind Service)

```yaml
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
        ports:
        - containerPort: 8080
```

---

## 📌 Common Service Commands

```bash
kubectl get svc
kubectl describe svc my-service
kubectl get endpoints my-service
```

---

## ❌ Common Mistakes (Very Important)

* Service selector does not match Pod labels ❌
* Expecting Service to work without Pods ❌
* Using NodePort in production ❌
* Confusing Service with Ingress ❌

---

## 🧠 Service vs Ingress (Quick View)

| Feature         | Service   | Ingress    |
| --------------- | --------- | ---------- |
| Works at        | L4 (TCP)  | L7 (HTTP)  |
| Routing         | Pod level | URL / Host |
| External access | Limited   | Advanced   |

---

## 🏁 Final Takeaway

> **Services provide stable networking in Kubernetes by abstracting away dynamic Pod IPs.**

They are fundamental to:

* Microservices communication
* Load balancing
* Application exposure

---

📌 This document is suitable for:

* README.md
* Kubernetes networking notes
* Interview preparation
* GitHub documentation

---

### 🔜 Next Recommended Topics

* Headless Services
* Service discovery (DNS)
* Ingress deep dive
* Network Policies

---

✅ **Status: Complete, Clean & Production‑Ready Notes**
