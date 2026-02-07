# 💾 Kubernetes Storage

### Volumes, Persistent Volumes (PV) & Persistent Volume Claims (PVC)

<p align="center">
  <img src="https://img.shields.io/badge/Focus-Kubernetes-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Category-Storage-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white" />
  <img src="https://img.shields.io/badge/Type-Hands--On-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Completed-orange?style=for-the-badge" />
</p>

---

## 🚀 About This Topic

In Kubernetes, **Pods are ephemeral**:

* Pods can restart
* Pods can be deleted
* Pods can move to another node

When a Pod is deleted, **any data stored inside the container is lost**.

For real applications like:

* 🗄️ Databases
* 🧾 Logs
* 📁 File uploads

data **must survive Pod restarts**.

To solve this problem, Kubernetes provides a **storage architecture** based on:

* Volumes
* Persistent Volumes (PV)
* Persistent Volume Claims (PVC)

This document is a **clean, final, production-ready reference** based on **hands-on practice and real cluster behavior**.

---

## 📦 Volumes in Kubernetes (Basic Storage)

A **Volume** is storage that is **directly attached to a Pod**.

### Key Characteristics

* Exists **only as long as the Pod exists**
* Deleted when Pod is deleted
* Used for temporary storage

### Example Use Cases

* Cache data
* Temporary files
* Inter-container communication

⚠️ Volumes are **NOT suitable for databases**.

---

## ❓ Why Persistent Storage Is Needed

Volumes alone are not enough because:

* Pods restart frequently
* Pods are rescheduled on node failure
* Applications need long-term data

To solve this, Kubernetes introduces **Persistent Volumes (PV)** and **Persistent Volume Claims (PVC)**.

---

## 🧱 Persistent Volume (PV)

A **Persistent Volume (PV)** represents **actual physical storage** available to the cluster.

### Key Points

* PV is a **cluster-level resource**
* Created by an administrator (or dynamically)
* Independent of Pods and namespaces
* Exists even if Pods are deleted

### Examples of Backing Storage

* Local disk (`hostPath`)
* Cloud disks (EBS, GCE PD)
* Network storage (NFS)

🧠 Think of PV as **a real hard disk made available to Kubernetes**.

---

## 📄 Persistent Volume Claim (PVC)

A **Persistent Volume Claim (PVC)** is a **request for storage** made by an application.

### Key Points

* PVC is created by users / applications
* Requests storage size and access mode
* Kubernetes binds PVC to a matching PV

👉 **Pods never use PV directly**
👉 Pods always use **PVC**

This separation provides:

* Flexibility
* Portability
* Loose coupling between app and storage

---

## 🔗 How PV, PVC, and Pod Work Together

```
Pod → PVC → PV → Physical Storage
```

Flow:

1. Admin provides PV
2. App creates PVC
3. Kubernetes binds PVC to PV
4. Pod mounts PVC
5. Data persists even if Pod restarts

---

## ⚖️ Volume vs Persistent Volume

| Feature          | Volume       | Persistent Volume |
| ---------------- | ------------ | ----------------- |
| Scope            | Pod-level    | Cluster-level     |
| Lifetime         | Pod lifetime | Independent       |
| Data persistence | ❌            | ✅                 |
| Suitable for DB  | ❌            | ✅                 |

---

## 📌 Access Modes (Important)

| Mode                | Meaning                  |
| ------------------- | ------------------------ |
| ReadWriteOnce (RWO) | Mounted by one node      |
| ReadOnlyMany (ROX)  | Read-only by many nodes  |
| ReadWriteMany (RWX) | Read-write by many nodes |

---

## 📌 Common Storage Commands

```bash
kubectl apply -f pv.yaml
kubectl apply -f pvc.yaml
kubectl get pv
kubectl get pvc -n myspace
kubectl describe pvc my-pvc -n myspace
```

---

## 📄 YAML Examples (Hands-On)

---

### 1️⃣ Persistent Volume (PV)

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-pv
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /mnt/data
```

---

### 2️⃣ Persistent Volume Claim (PVC)

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
  namespace: myspace
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

---

### 3️⃣ Pod Using PVC

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
  namespace: myspace
spec:
  containers:
  - name: app-container
    image: nginx
    volumeMounts:
    - mountPath: /data
      name: storage-volume
  volumes:
  - name: storage-volume
    persistentVolumeClaim:
      claimName: my-pvc
```

---

## ❌ Common Mistakes (Very Important)

* Storing DB data in container filesystem ❌
* Expecting Volumes to persist data ❌
* Using `hostPath` in production ❌
* Mounting PV directly to Pod ❌

---

## 🧠 Storage in Real-World Kubernetes

* Deployments → usually stateless
* StatefulSets → use PVCs
* Databases → always use PVC
* Production → dynamic provisioning via StorageClass

---

## 🏁 Final Takeaway

> **Persistent storage in Kubernetes is achieved using PVs and PVCs, not simple volumes.**

Remember:

* Pods are temporary
* Data must be permanent
* PVC is the bridge between Pods and storage

---

📌 This document is suitable for:

* README.md
* Kubernetes storage notes
* Interview preparation
* GitHub documentation

---

### 🔜 Next Recommended Topics

* StorageClass & Dynamic Provisioning
* StatefulSet + PVC
* Volume types (NFS, EBS)
* Backup strategies

---

✅ **Status: Complete, Clean & Production-Ready Notes**
