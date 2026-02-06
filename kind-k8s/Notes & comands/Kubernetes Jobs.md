<h1 align="center">🧾 Kubernetes Jobs</h1>
<h3 align="center">Running One-Time & Batch Tasks Reliably in Kubernetes</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Focus-Kubernetes-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Category-Workloads-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white">
  <img src="https://img.shields.io/badge/Type-Hands--On-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/Status-Completed-orange?style=for-the-badge">
</p>

---

## 🚀 About This Topic

Not all applications in Kubernetes are long-running services.  
Some tasks need to **run once and finish**, such as:

- Database migrations
- Backups
- Batch processing
- One-time scripts

To handle such workloads, Kubernetes provides **Jobs**.

Everything written in this file is **only and exactly based on my handwritten notes and hands-on practice**, documented as one final reference.

---

## 📌 What is a Job?

A **Job** is a Kubernetes object that:
- Runs a Pod **until completion**
- Ensures the task finishes successfully
- Automatically restarts the Pod if it fails

Once the task completes successfully, the Job **stops**.

---

## ❓ Why Job Is Needed

- Pods are meant for long-running processes
- Some tasks should run only once
- Manual Pod management is unreliable

Job solves this by:
- Managing Pod execution
- Retrying on failure
- Ensuring task completion

---


- Job creates a Pod
- Pod runs the task
- If Pod fails → Job creates a new Pod
- If task succeeds → Job ends

---

## ⚙️ Job Characteristics

- Job is **not continuous**
- Job ends after successful completion
- Job ensures **at-least-once execution**
- Used for batch and one-time tasks

---

## 📌 Commands Used (from notes only)

Create Job  
  kubectl apply -f job.yml  

Check Job  
  kubectl get jobs -n myspace  

Check Pods created by Job  
  kubectl get pods -n myspace  

View Job Logs  
  kubectl logs pod/<pod-name> -n myspace  

---

## 📄 YAML FILE EXAMPLE (AS PRACTICED)

### Job YAML Example

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: demo-job
  namespace: myspace
spec:
  completions: 1
  parallelism: 1
  template:
    metadata:
      name: demo-job-pod
    spec:
      restartPolicy: Never
      containers:
      - name: job-container
        image: busybox
        command: ["sh", "-c", "echo Hello from Kubernetes Job"]


