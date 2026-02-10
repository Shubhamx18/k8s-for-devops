# Kubernetes Namespaces

Namespaces are logical partitions inside a cluster. Once you start running multiple apps, teams, or environments on the same cluster, namespaces are what keeps everything from becoming a mess — separate name scopes, separate access controls, separate resource quotas.

---

## Default Namespaces

Every cluster ships with these out of the box:

| Namespace           | Purpose                                          |
| ------------------- | ------------------------------------------------ |
| `default`           | Where resources land if you don't specify one    |
| `kube-system`       | Core Kubernetes components (DNS, scheduler, etc) |
| `kube-public`       | Public cluster-wide info, readable by anyone     |
| `kube-node-lease`   | Node heartbeat and lease tracking                |

Don't deploy your apps into `default` or `kube-system`. Always create your own.

---

## What is and isn't Namespaced

Most resources are namespaced — Pods, Deployments, Services, StatefulSets, ConfigMaps, Secrets. Some are cluster-scoped and exist outside any namespace: Nodes, PersistentVolumes, ClusterRoles, and Namespaces themselves.

```bash
# see everything that is namespaced
kubectl api-resources --namespaced=true

# see everything that isn't
kubectl api-resources --namespaced=false
```

---

## Common Patterns

| Namespace     | Use case                    |
| ------------- | --------------------------- |
| `dev`         | Development environment     |
| `staging`     | Pre-prod / QA               |
| `prod`        | Production                  |
| `monitoring`  | Prometheus, Grafana         |
| `logging`     | ELK / EFK stack             |

One important thing: namespaces don't isolate networking by default. A pod in `dev` can still reach a service in `prod` if it knows the full DNS name. For actual network isolation you need NetworkPolicies.

---

## Example 1 — Create and Use a Namespace

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: myspace
```

```bash
kubectl apply -f namespace.yaml

# or imperatively
kubectl create namespace myspace
```

Any resource you create after this needs `namespace: myspace` in its metadata, or it lands in `default`.

---

## Example 2 — Deployment Scoped to a Namespace

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  namespace: myspace
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:alpine
          ports:
            - containerPort: 80
```

You can have another `nginx` Deployment in `prod` with zero conflicts — the namespace is part of the resource identity.

---

## Example 3 — ResourceQuota on a Namespace

Caps how much CPU and memory the entire namespace can consume. Useful when multiple teams share a cluster.

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: myspace-quota
  namespace: myspace
spec:
  hard:
    pods: "10"
    requests.cpu: "2"
    requests.memory: 2Gi
    limits.cpu: "4"
    limits.memory: 4Gi
```

Once the quota is hit, new pods won't schedule until something is freed up.

---

## Commands

```bash
# list all namespaces
kubectl get ns

# create
kubectl create namespace myspace

# get resources inside a namespace
kubectl get all -n myspace

# set a default namespace for your current context (so you don't type -n every time)
kubectl config set-context --current --namespace=myspace

# delete a namespace and everything inside it
kubectl delete namespace myspace
```

---

## Namespace vs Cluster

| Feature          | Namespace      | Separate Cluster |
| ---------------- | -------------- | ---------------- |
| Isolation        | Logical        | Physical         |
| Network isolation| Only with policies | Full by default |
| Cost             | Free           | Extra infra      |
| Resource sharing | Yes            | No               |
| Typical use      | Envs / teams   | Org-level split  |

---

## Notes

- Deleting a namespace deletes everything inside it — Deployments, Services, Secrets, PVCs, all of it. Double-check before running `kubectl delete namespace`
- `kubectl config set-context --current --namespace=myspace` sets a sticky default so you stop having to append `-n myspace` to every command
- Cross-namespace service discovery works via full DNS: `service-name.namespace.svc.cluster.local`
- For actual access control per namespace, pair namespaces with RBAC (RoleBindings scoped to a namespace)
