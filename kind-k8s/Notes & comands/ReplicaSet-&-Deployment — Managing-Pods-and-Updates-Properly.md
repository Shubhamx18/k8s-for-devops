<h1 align="center">☸️ Kubernetes Workloads</h1>
<h3 align="center">ReplicaSet & Deployment — Managing Pods and Updates Properly</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Focus-Kubernetes-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Category-Workloads-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white">
  <img src="https://img.shields.io/badge/Type-Hands--On-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/Status-Completed-orange?style=for-the-badge">
</p>

---

## 🚀 About This Topic

In Kubernetes, **Pods are temporary**.  
If a Pod crashes or is deleted, the application can stop working.

To solve this problem, Kubernetes provides **ReplicaSet** and **Deployment**.  
These workload objects ensure Pods are always running, scalable, and can be updated safely.

Everything written in this file is **only and exactly based on my handwritten notes and hands-on practice**, documented as a single final reference.

---

## 🔁 ReplicaSet

A ReplicaSet ensures that a **specified number of identical Pods are always running**.

If:
- A Pod crashes → a new Pod is created  
- A Pod is deleted manually → a new Pod is created  

### Why ReplicaSet Is Needed
- Pods are temporary  
- Pods can be deleted accidentally  
- ReplicaSet keeps the application alive  
- Maintains the required number of replicas at all times  

### How ReplicaSet Works
- User defines the number of replicas  
- Kubernetes continuously checks the current state  
- If required Pods are missing, new Pods are created automatically  

**Example:**
- Required replicas = 3  
- One Pod deleted → ReplicaSet creates 1 new Pod  

### Important Points About ReplicaSet
- ReplicaSet manages Pods only  
- ReplicaSet does NOT handle updates  
- ReplicaSet is usually not used directly in production  

---

## 🚀 Deployment

A Deployment is a Kubernetes object that:
- Manages ReplicaSets  
- Manages Pods  
- Handles application updates  
- Supports rollback  

Deployment ensures Pods are **always running and updated properly**.

### Why Deployment Is Needed
- ReplicaSet cannot manage updates  
- Deployment solves update problems  
- Deployment creates and controls ReplicaSets internally  

---

## 🔄 Rollout

Rollout is the process of **updating application Pods gradually**.

- Old Pods are removed one by one  
- New Pods are created one by one  
- Application keeps running without downtime  

---

## 📌 Commands Used (from notes only)

Create ReplicaSet  
  kubectl apply -f replicaset.yml  

Edit ReplicaSet  
  kubectl edit replicaset my-replicaset -n myspace  

Check Pods  
  kubectl get pods -n myspace  

Update Image in Deployment  
  kubectl set image deployment my-deployment myapp=nginx:1.21 -n myspace  

Rollback Deployment  
  kubectl rollout undo deployment my-deployment -n myspace  

Scale Deployment  
  kubectl scale deployment my-deployment --replicas=5 -n myspace  

---

## 📄 YAML FILE EXAMPLES (AS PRACTICED)

### 1️⃣ ReplicaSet YAML Example

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: my-replicaset
  namespace: myspace
spec:
  replicas: 3
  selector:
    matchLabels:
      app: demo-app
  template:
    metadata:
      labels:
        app: demo-app
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80

Deployment YAML Example (Basic)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
  namespace: myspace
spec:
  replicas: 3
  selector:
    matchLabels:
      app: demo-app
  template:
    metadata:
      labels:
        app: demo-app
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80


Deployment YAML Example (With Rolling Update Strategy)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
  namespace: myspace
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  selector:
    matchLabels:
      app: demo-app
  template:
    metadata:
      labels:
        app: demo-app
    spec:
      containers:
      - name: nginx
        image: nginx:1.21
        ports:
        - containerPort: 80
