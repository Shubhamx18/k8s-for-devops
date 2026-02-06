<h1 align="center">⏰ Kubernetes CronJobs</h1>
<h3 align="center">Scheduling Repetitive Tasks Automatically in Kubernetes</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Focus-Kubernetes-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Category-Workloads-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white">
  <img src="https://img.shields.io/badge/Type-Hands--On-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/Status-Completed-orange?style=for-the-badge">
</p>

---

## 🚀 About This Topic

Some tasks in Kubernetes are **not one-time**, but need to **run repeatedly on a schedule**, such as:

- Database backups
- Log cleanup
- Report generation
- Scheduled batch jobs

To handle this, Kubernetes provides **CronJobs**, which work similar to **Linux cron**.

Everything written in this file is **only and exactly based on my handwritten notes and hands-on practice**, documented as one final reference.

---

## ⏱️ What is a CronJob?

A **CronJob** is a Kubernetes object that:
- Runs Jobs on a **scheduled time**
- Automatically creates Jobs
- Uses **cron syntax** for scheduling

CronJob → creates **Job** → Job creates **Pod**

---

## ❓ Why CronJob Is Needed

- Manual execution of Jobs is not practical
- Repeated tasks need automation
- Time-based execution is required

CronJob solves this by:
- Scheduling Jobs automatically
- Ensuring tasks run at correct times
- Reducing manual effort

---

- CronJob triggers at scheduled time
- Job is created
- Job creates Pod
- Pod runs task and completes

---

## 🕒 Cron Schedule Format

CronJobs use **five fields** for scheduling:


---

## 📅 Example Schedules

- Every minute  
  `* * * * *`

- Every day at midnight  
  `0 0 * * *`

- Every Sunday at 1 AM  
  `0 1 * * 0`

---

## ⚙️ CronJob Characteristics

- CronJob runs **Jobs**, not Pods directly
- CronJob does not run continuously
- Each schedule creates a new Job
- Old Jobs can be cleaned automatically

---

## 📌 Commands Used (from notes only)

Create CronJob  
  kubectl apply -f cronjob.yml  

Check CronJobs  
  kubectl get cronjob -n myspace  

Check Jobs created by CronJob  
  kubectl get jobs -n myspace  

Check Pods  
  kubectl get pods -n myspace  

---

## 📄 YAML FILE EXAMPLE (AS PRACTICED)

### CronJob YAML Example

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: demo-cronjob
  namespace: myspace
spec:
  schedule: "*/1 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
          - name: cronjob-container
            image: busybox
            command: ["sh", "-c", "date; echo Hello from Kubernetes CronJob"]

## 🔁 CronJob Working Flow

