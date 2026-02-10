# Kubernetes CronJobs

CronJobs handle tasks that need to run on a schedule — database backups, log cleanup, report generation, batch processing. Anything you'd normally set up as a Linux cron job, but managed by Kubernetes.

---

## How it Works

```
CronJob → Job → Pod
```

The CronJob fires on schedule and creates a Job. The Job creates a Pod. The Pod runs the task, exits, and the Job records the result. The CronJob itself doesn't run continuously — it just triggers Jobs at the right time.

---

## Cron Schedule Format

```
* * * * *
│ │ │ │ │
│ │ │ │ └── Day of week (0-7)
│ │ │ └──── Month (1-12)
│ │ └────── Day of month (1-31)
│ └──────── Hour (0-23)
└────────── Minute (0-59)
```

Common examples:

| Schedule       | Meaning              |
| -------------- | -------------------- |
| `* * * * *`    | Every minute         |
| `*/5 * * * *`  | Every 5 minutes      |
| `0 0 * * *`    | Daily at midnight    |
| `0 1 * * 0`    | Every Sunday at 1 AM |
| `30 9 * * 1-5` | 9:30 AM, Mon–Fri     |

---

## Example 1 — Quick Test (busybox)

Just to verify the CronJob is triggering and the schedule works. Runs every minute and prints the current timestamp.

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: hello-cronjob
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
            - name: hello
              image: busybox
              command:
                - sh
                - -c
                - |
                  echo "CronJob fired at: $(date)"
```

---

## Example 2 — MySQL Database Backup

Runs every day at midnight. Dumps the database and saves it to a mounted PVC with a timestamped filename. This is a pattern you'd actually use in production.

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: mysql-backup
  namespace: myspace
spec:
  schedule: "0 0 * * *"
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
  concurrencyPolicy: Forbid
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: mysql-backup
              image: mysql:8.0
              env:
                - name: MYSQL_PWD
                  valueFrom:
                    secretKeyRef:
                      name: mysql-secret
                      key: MYSQL_ROOT_PASSWORD
              command:
                - sh
                - -c
                - |
                  FILENAME="/backups/backup-$(date +%Y%m%d-%H%M%S).sql"
                  mysqldump -h mysql -u root mydatabase > $FILENAME
                  echo "Backup saved to $FILENAME"
              volumeMounts:
                - name: backup-storage
                  mountPath: /backups
          volumes:
            - name: backup-storage
              persistentVolumeClaim:
                claimName: backup-pvc
```

The PVC (`backup-pvc`) needs to exist before this runs — create it separately so backups persist across pod restarts.

---

## Example 3 — Log Cleanup

Runs every Sunday at 1 AM and deletes log files older than 7 days from a shared volume.

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: log-cleanup
  namespace: myspace
spec:
  schedule: "0 1 * * 0"
  successfulJobsHistoryLimit: 2
  failedJobsHistoryLimit: 1
  concurrencyPolicy: Forbid
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: cleanup
              image: busybox
              command:
                - sh
                - -c
                - |
                  echo "Starting log cleanup at $(date)"
                  find /logs -type f -name "*.log" -mtime +7 -delete
                  echo "Cleanup done"
              volumeMounts:
                - name: log-storage
                  mountPath: /logs
          volumes:
            - name: log-storage
              persistentVolumeClaim:
                claimName: logs-pvc
```

---

## Commands

```bash
# apply
kubectl apply -f cronjob.yaml

# list cronjobs
kubectl get cronjob -n myspace

# list jobs spawned by the cronjob
kubectl get jobs -n myspace

# list pods
kubectl get pods -n myspace

# inspect
kubectl describe cronjob mysql-backup -n myspace

# check logs of a specific job pod
kubectl logs -n myspace <pod-name>
```

---

## Job vs CronJob vs Deployment

| Use case         | Resource   |
| ---------------- | ---------- |
| One-time task    | Job        |
| Scheduled task   | CronJob    |
| Long-running app | Deployment |

---

## Notes

- `concurrencyPolicy: Forbid` — prevents a new Job from firing if the previous one is still running. Useful for backups where you don't want two dumps happening at the same time. Default is `Allow`.
- `restartPolicy: OnFailure` — only restart the pod if it exits with an error, not on success
- `successfulJobsHistoryLimit` / `failedJobsHistoryLimit` — controls how many old Job records stick around before Kubernetes cleans them up
- CronJobs are for short-lived, finite tasks — don't use them for anything that needs to run continuously
- Use [crontab.guru](https://crontab.guru) to validate your schedule expressions before applying
