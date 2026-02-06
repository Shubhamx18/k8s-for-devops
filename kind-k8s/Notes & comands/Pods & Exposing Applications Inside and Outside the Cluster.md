<h1 align="center">🔗 Kubernetes Services</h1>
<h3 align="center">Connecting Pods & Exposing Applications Inside and Outside the Cluster</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Focus-Kubernetes-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Category-Networking-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white">
  <img src="https://img.shields.io/badge/Type-Hands--On-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/Status-Completed-orange?style=for-the-badge">
</p>

---

## 🚀 About This Topic

In Kubernetes, **Pods are dynamic and temporary**.  
Their IP addresses change whenever Pods restart or are recreated.

To provide a **stable way to access Pods**, Kubernetes introduces **Services**.

Everything written in this file is **only and exactly based on my handwritten notes and hands-on practice**, written as a single final reference.

---

## 🌐 What is a Service?

A **Service** is a Kubernetes object that:
- Provides a **stable IP and DNS**
- Enables communication between Pods
- Exposes applications inside or outside the cluster

A Service selects Pods using **labels** and forwards traffic to them.

---

## ❓ Why Service Is Needed

- Pod IPs change frequently
- Direct Pod-to-Pod communication is unreliable
- Load balancing is required

Service solves this by:
- Acting as a permanent access point
- Load balancing traffic across Pods
- Decoupling clients from Pod lifecycle

---

## 🔁 Service → Pod Communication


Service never talks randomly — it always uses **label selectors**.

---

## 🧩 Types of Services

### 1️⃣ ClusterIP (Default)

- Exposes Service **inside the cluster only**
- Used for internal communication
- Default Service type

---

### 2️⃣ NodePort

- Exposes Service on each Node’s IP
- Accessible from outside the cluster
- Uses a port range (30000–32767)

---

### 3️⃣ LoadBalancer

- Used mainly in cloud environments
- Creates an external load balancer
- Automatically assigns public IP

---

## 🚪 Expose Command

The `kubectl expose` command is used to quickly create a Service for an existing resource like a Deployment or Pod.

Example:
- Deployment exists
- Expose it as a Service

---

## 🔀 Port Forwarding

Port forwarding is used to:
- Access an application locally
- Debug applications
- Avoid creating a Service temporarily

Traffic is forwarded from **local machine → Pod or Service**.

---

## 📌 Commands Used (from notes only)

Create Service using expose  
  kubectl expose deployment my-deployment --type=NodePort --port=80

Check Services  
  kubectl get svc

Describe Service  
  kubectl describe svc my-service

Port Forward Pod  
  kubectl port-forward pod/mypod 8080:80

Port Forward Service  
  kubectl port-forward svc/my-service 8080:80

---

## 📄 YAML FILE EXAMPLES (AS PRACTICED)

### 1️⃣ ClusterIP Service YAML

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

NodePort Service YAML
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



Deployment YAML (Backend Pods)
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
