<h1 align="center">💾 Kubernetes Storage</h1>
<h3 align="center">Volumes, Persistent Volumes (PV) & Persistent Volume Claims (PVC)</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Focus-Kubernetes-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Category-Storage-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white">
  <img src="https://img.shields.io/badge/Type-Hands--On-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/Status-Completed-orange?style=for-the-badge">
</p>

---

## 🚀 About This Topic

In Kubernetes, **Pods are temporary**, and when a Pod is deleted or recreated, **all data inside the container is lost**.

For applications like **databases**, logs, or file storage, data must **persist even if Pods die**.  
To solve this problem, Kubernetes provides a **storage architecture** using:

- Volumes
- Persistent Volumes (PV)
- Persistent Volume Claims (PVC)

Everything written in this file is **only and exactly based on my handwritten notes and hands-on practice**, documented as one final reference.

---

## 📦 Volumes in Kubernetes

A **Volume** is storage that is attached directly to a Pod.

- Volume exists **as long as the Pod exists**
- When Pod is deleted → data is lost
- Used for temporary storage

Volumes are useful but **not reliable for long-term data**.

---

## ❓ Why Persistent Storage Is Needed

- Pods can restart
- Pods can be deleted
- Node failure can remove Pods
- Databases need permanent storage

To solve these problems, Kubernetes introduces **Persistent Volumes**.

---

## 🧱 Persistent Volume (PV)

A **Persistent Volume (PV)** represents **actual physical storage** in the cluster.

- PV is a **cluster-level resource**
- Created by the administrator
- Independent of Pods
- Exists even if Pods are deleted

Examples of actual storage:
- Local disk
- Cloud disk
- Network storage

---

## 📄 Persistent Volume Claim (PVC)

A **Persistent Volume Claim (PVC)** is a **request for storage**.

- Created by the user/application
- Requests storage size and access mode
- PVC binds to a suitable PV

👉 **Pods never use PV directly**  
👉 Pods always use **PVC**

---


This separation allows:
- Flexibility
- Reusability
- Decoupling application from storage

---

## ⚖️ Volume vs Persistent Volume

| Volume | Persistent Volume |
|------|------------------|
| Pod-level | Cluster-level |
| Temporary | Persistent |
| Deleted with Pod | Exists independently |
| Not reusable | Reusable |

---

## 📌 Commands Used (from notes only)

Create PV / PVC  
  kubectl apply -f pv.yml  
  kubectl apply -f pvc.yml  

Check PV  
  kubectl get pv  

Check PVC  
  kubectl get pvc -n myspace  

---

## 📄 YAML FILE EXAMPLES (AS PRACTICED)

### 1️⃣ Persistent Volume (PV) YAML

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
---

Persistent Volume Claim (PVC) YAML
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

---


Pod Using PVC YAML
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

---

