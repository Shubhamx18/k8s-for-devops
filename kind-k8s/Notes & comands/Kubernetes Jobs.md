# Kubernetes Jobs

Jobs are for workloads that need to run once, finish successfully, and stop — database migrations, one-off scripts, backups, batch data processing. Unlike a Deployment that keeps restarting, a Job tracks completion and retries failed pods automatically until the task succeeds.

---

## How it Works

```
Job → Pod → Task Execution
```

The Job creates a Pod. If the Pod fails, the Job creates a new one. Once the task exits successfully, the Job is marked Complete and stops. The record stays in Kubernetes so you can inspect logs afterward.

---

## Example 1 — Quick Test (busybox)

Minimal Job to confirm the setup works. Runs once and exits.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: hello-job
  namespace: myspace
spec:
  completions: 1
  parallelism: 1
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: hello
          image: busybox
          command:
            - sh
            - -c
            - echo "Job ran at $(date)"
```

---

## Example 2 — Database Migration

Runs a migration script against MySQL before deploying a new app version. `backoffLimit` controls how many times Kubernetes retries before giving up.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: db-migration
  namespace: myspace
spec:
  completions: 1
  parallelism: 1
  backoffLimit: 3
  template:
    spec:
      restartPolicy: OnFailure
      containers:
        - name: migrate
          image: shubhamm18/diffpods:01
          command:
            - sh
            - -c
            - |
              echo "Running DB migration..."
              node migrate.js
              echo "Migration complete"
          env:
            - name: DB_HOST
              valueFrom:
                configMapKeyRef:
                  name: mysql-config
                  key: DB_HOST
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-secret
                  key: MYSQL_ROOT_PASSWORD
```

---

## Example 3 — Parallel Batch Processing

Processes 5 tasks in total, running 2 Pods at a time. Each Pod picks up a chunk of work. Useful for bulk data imports or report generation.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: batch-processor
  namespace: myspace
spec:
  completions: 5
  parallelism: 2
  backoffLimit: 2
  template:
    spec:
      restartPolicy: OnFailure
      containers:
        - name: processor
          image: busybox
          command:
            - sh
            - -c
            - |
              echo "Processing batch item on pod: $HOSTNAME"
              sleep 5
              echo "Done"
```

With `completions: 5` and `parallelism: 2`, Kubernetes runs 2 Pods at a time until 5 successful completions are recorded.

---

## Key Fields

| Field            | What it does                                               |
| ---------------- | ---------------------------------------------------------- |
| `completions`    | How many successful Pod runs are needed before Job is done |
| `parallelism`    | How many Pods run at the same time                         |
| `backoffLimit`   | How many retries before the Job is marked Failed           |
| `restartPolicy`  | `Never` = Job retries with new Pod, `OnFailure` = same Pod |

---

## Commands

```bash
# apply
kubectl apply -f job.yaml

# check job status
kubectl get jobs -n myspace

# check pods created by the job
kubectl get pods -n myspace

# view logs
kubectl logs <pod-name> -n myspace

# inspect
kubectl describe job db-migration -n myspace

# clean up completed jobs manually
kubectl delete job db-migration -n myspace
```

---

## Job vs CronJob vs Deployment

| Use case           | Resource   |
| ------------------ | ---------- |
| One-time task      | Job        |
| Scheduled/repeated | CronJob    |
| Long-running app   | Deployment |

---

## Notes

- `restartPolicy: Never` vs `OnFailure` — `Never` creates a fresh Pod on each retry (clean state), `OnFailure` restarts the same Pod. For migrations, `OnFailure` is safer since it avoids running the script twice in parallel.
- Completed Jobs and their Pods aren't deleted automatically — set `ttlSecondsAfterFinished` on the Job spec if you want auto-cleanup
- Jobs guarantee **at-least-once** execution, not exactly-once — make sure your task is idempotent if retries are possible
