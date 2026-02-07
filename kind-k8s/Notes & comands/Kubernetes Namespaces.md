# 🗂️ Kubernetes Namespaces

### Logical Isolation & Resource Organization in Kubernetes

<p align="center">
  <img src="https://img.shields.io/badge/Focus-Kubernetes-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Category-Core--Concepts-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white" />
  <img src="https://img.shields.io/badge/Type-Hands--On-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Completed-orange?style=for-the-badge" />
</p>

---

## 🚀 About This Topic

As Kubernetes clusters grow, running **all resources in a single space becomes unmanageable**.

To solve this, Kubernetes provides **Namespaces**, which allow **logical separation of resources inside the same cluster**.

This document is a **clean, final reference** created from:

* Hands‑on practice
* Real cluster usage
* Learning‑focused notes (no unnecessary theory)

---

## 🧠 What is a Namespace?

A **Namespace** is a **logical partition** inside a Kubernetes cluster.

It is used to:

* Group related resources
* Avoid name conflicts
* Apply policies and limits

A **single Kubernetes cluster can contain many namespaces**, all running on the same nodes.

---

## ❓ Why Namespaces Are Needed

Namespaces are essential when:

* Multiple applications run in one cluster
* Different teams share the same cluster
* Dev / Test / Prod environments coexist
* Resource organization becomes complex

Namespaces help by:

* Separating environments
* Improving visibility and management
* Enabling security and quota control

---

## 📦 Default Namespaces in Kubernetes

When a Kubernetes cluster is created, the following namespaces already exist:

| Namespace         | Purpose                                          |
| ----------------- | ------------------------------------------------ |
| `default`         | Resources created without specifying a namespace |
| `kube-system`     | Core Kubernetes system components                |
| `kube-public`     | Public cluster‑wide information                  |
| `kube-node-lease` | Node heartbeat & lease info                      |

⚠️ **Best Practice:**
Never deploy your applications in `kube-system`.

---

## 🔁 How Namespaces Work (Important)

* Most Kubernetes resources are **namespaced**
* Same resource names can exist in different namespaces
* Namespaces do **NOT** provide network isolation by default

Example:

```text
nginx (namespace: dev)
nginx (namespace: prod)
```

Both can exist without conflict.

---

## 📌 Resources That ARE Namespaced

* Pods
* Services
* Deployments
* StatefulSets
* ConfigMaps
* Secrets

## 📌 Resources That Are NOT Namespaced

* Nodes
* PersistentVolumes
* Namespaces
* ClusterRoles

---

## 🧪 Real‑World Namespace Usage

### Common patterns:

| Namespace    | Use Case                |
| ------------ | ----------------------- |
| `dev`        | Development environment |
| `test`       | Testing / QA            |
| `prod`       | Production              |
| `monitoring` | Prometheus, Grafana     |
| `logging`    | ELK / EFK stack         |

Namespaces make **large clusters manageable**.

---

## 📌 Common Namespace Commands

### Create a Namespace

```bash
kubectl create namespace myspace
```

### List all Namespaces

```bash
kubectl get ns
```

### Set Default Namespace (optional)

```bash
kubectl config set-context --current --namespace=myspace
```

### Get Pods from a Namespace

```bash
kubectl get pods -n myspace
```

---

## 📄 Namespace YAML Example

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: myspace
```

---

## 📄 Using Namespace in Resource YAML

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
```

This Deployment will be created **inside the `myspace` namespace**.

---

## ❌ Common Mistakes (Important)

* Forgetting `-n namespace` flag ❌
* Deploying apps in `default` namespace ❌
* Assuming namespaces isolate networking ❌
* Deleting a namespace without checking resources ❌

---

## 🧠 Namespaces vs Clusters (Interview Question)

| Feature          | Namespace            | Cluster        |
| ---------------- | -------------------- | -------------- |
| Isolation        | Logical              | Physical       |
| Cost             | Low                  | High           |
| Resource sharing | Yes                  | No             |
| Typical use      | Environments / teams | Org separation |

---

## 🏁 Final Takeaway

> **Namespaces provide logical isolation and organization within a single Kubernetes cluster.**

They are critical for:

* Multi‑team clusters
* Environment separation
* Clean resource management

---

📌 This document is suitable for:

* README.md
* Kubernetes notes
* Interview preparation
* GitHub documentation

---

### 🔜 Next Recommended Topics

* ResourceQuota & LimitRange
* RBAC with Namespaces
* Network Policies
* Namespace deletion behavior

---

✅ **Status: Complete, Clean & Production‑Ready Notes**
