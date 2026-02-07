# ⏰ Kubernetes CronJobs

### Scheduling Repetitive Tasks Automatically in Kubernetes

<p align="center">
  <img src="https://img.shields.io/badge/Focus-Kubernetes-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Category-Workloads-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white" />
  <img src="https://img.shields.io/badge/Type-Hands--On-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Completed-orange?style=for-the-badge" />
</p>

---

## 🚀 About This Topic

Not all workloads in Kubernetes run **continuously**.
Some tasks need to run **automatically at specific times** or **repeated intervals**, such as:

* 🗄️ Database backups
* 🧹 Log cleanup
* 📊 Report generation
* 🔁 Batch processing
* 📧 Sending scheduled emails

To handle such time‑based tasks, Kubernetes provides **CronJobs**, which work very similar to **Linux cron**.

This document is a **final, clean reference** based purely on **hands‑on practice and learning notes**.

---

## ⏱️ What is a CronJob?

A **CronJob** is a Kubernetes workload that:

* Runs tasks on a **time‑based schedule**
* Automatically creates **Jobs**
* Uses standard **cron syntax**

### Execution chain (very important):

```
CronJob → Job → Pod
```

* CronJob schedules execution
* Job manages execution logic
* Pod runs the actual container

---

## ❓ Why CronJob is Needed

Running Jobs manually is:

* Error‑prone
* Not scalable
* Not time‑accurate

CronJobs solve this by:

* Automating execution
* Running tasks at exact times
* Removing manual intervention

---

## 🔁 CronJob Working Flow

1. Cron schedule time is reached
2. CronJob creates a **Job**
3. Job creates a **Pod**
4. Pod runs the task
5. Pod completes and exits
6. Job status is recorded

CronJob **does NOT run continuously** — it only triggers Jobs at scheduled times.

---

## 🕒 Cron Schedule Format

CronJobs use **five time fields**:

```
* * * * *
│ │ │ │ │
│ │ │ │ └── Day of week (0‑7)
│ │ │ └──── Month (1‑12)
│ │ └────── Day of month (1‑31)
│ └──────── Hour (0‑23)
└────────── Minute (0‑59)
```

---

## 📅 Common Cron Schedule Examples

| Schedule       | Meaning               |
| -------------- | --------------------- |
| `* * * * *`    | Every minute          |
| `*/5 * * * *`  | Every 5 minutes       |
| `0 0 * * *`    | Every day at midnight |
| `0 1 * * 0`    | Every Sunday at 1 AM  |
| `30 9 * * 1-5` | 9:30 AM, Mon–Fri      |

---

## ⚙️ CronJob Characteristics

* CronJob creates **Jobs**, not Pods directly
* Each execution creates a **new Job**
* Jobs can run in parallel (if allowed)
* Old Jobs can be cleaned automatically
* Best suited for **short‑lived tasks**

---

## 📄 CronJob YAML Example (Hands‑On)

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: demo-cronjob
  namespace: myspace
spec:
  schedule: "*/1 * * * *"
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
          - name: cronjob-container
            image: busybox
            command:
              - sh
              - -c
              - |
                date
                echo "Hello from Kubernetes CronJob"
```

---

## 🧠 Explanation of Important Fields

### `schedule`

Defines **when** the job runs.

### `jobTemplate`

Defines **what job** should be created.

### `restartPolicy: OnFailure`

* Restarts pod only if it fails
* Recommended for batch jobs

### `successfulJobsHistoryLimit`

* How many completed jobs to keep

### `failedJobsHistoryLimit`

* How many failed jobs to keep

---

## 📌 Commands Used (Practical)

### Apply CronJob

```bash
kubectl apply -f cronjob.yaml
```

### List CronJobs

```bash
kubectl get cronjob -n myspace
```

### List Jobs created by CronJob

```bash
kubectl get jobs -n myspace
```

### List Pods

```bash
kubectl get pods -n myspace
```

### View CronJob details

```bash
kubectl describe cronjob demo-cronjob -n myspace
```

---

## ❌ Common Mistakes (Important)

* Using CronJob for long‑running services ❌
* Forgetting job history cleanup ❌
* Wrong cron syntax ❌
* Expecting CronJob to restart continuously ❌

CronJobs are meant for **finite tasks only**.

---

## 🧠 When to Use CronJob vs Job

| Use Case         | Use        |
| ---------------- | ---------- |
| One‑time task    | Job        |
| Scheduled task   | CronJob    |
| Long‑running app | Deployment |

---

## 🏁 Final Takeaway

> **CronJobs automate time‑based tasks in Kubernetes by creating Jobs at scheduled times.**

They are essential for:

* Backups
* Cleanup tasks
* Scheduled processing

---

📌 This document is suitable for:

* README.md
* Kubernetes notes
* Interview preparation
* GitHub learning repository

---

### 🔜 Next Recommended Topics

* Job vs CronJob (deep dive)
* Concurrency policies in CronJob
* CronJob failure handling
* Real production CronJob examples

---

✅ **Status: Complete, Clean & Production‑Ready Notes**
