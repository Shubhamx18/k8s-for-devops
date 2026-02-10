# KIND Kubernetes Cluster

Running a local Kubernetes cluster using KIND (Kubernetes IN Docker). I use this instead of Minikube because it spins up faster, supports multi-node clusters out of the box, and the YAML files you write here work the same way on EKS, GKE, or any kubeadm cluster.

---

## What is KIND

KIND runs each Kubernetes node as a Docker container — no VMs involved. You get a real control plane and worker nodes, just containerized. It's what the Kubernetes project itself uses for testing.

---

## KIND vs Minikube

| Feature            | Minikube    | KIND        |
| ------------------ | ----------- | ----------- |
| Runs on            | VM / Docker | Docker only |
| Startup speed      | Slower      | Faster      |
| Multi-node cluster | Limited     | Easy        |
| CI/CD friendly     | No          | Yes         |
| Production-like    | Medium      | High        |

---

## Prerequisites

- **Docker** — KIND runs nodes as Docker containers, so this is non-negotiable
- **kubectl** — same one you'd use against any real cluster
- **KIND binary** — for creating and managing clusters

---

## Installation (Linux)

```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
kind version
```

---

## Create a Cluster

```bash
kind create cluster --name my-cluster
```

This pulls the node image, starts a Docker container, bootstraps the control plane, and updates your kubeconfig automatically.

---

## Verify

```bash
kubectl cluster-info
kubectl get nodes
```

Expected output:

```
NAME                       STATUS   ROLES           AGE   VERSION
my-cluster-control-plane   Ready    control-plane   ...   v1.xx.x
```

---

## How it Works Internally

```
Docker Container
   └── Kubernetes Node
        ├── kubelet
        ├── kube-proxy
        ├── containerd
        └── control-plane components
```

When you run `kubectl apply -f`, Kubernetes processes it the same way it would in production. The containerized node is transparent to the cluster internals.

---

## Delete a Cluster

```bash
kind delete cluster --name my-cluster
```

Useful when you want a clean slate — no leftover resources, no stale state.

---

## Notes

- Everything that works here works on kubeadm, EKS, GKE, AKS — no surprises
- Great for testing Deployments, StatefulSets, Services, Ingress, PVCs, and failure scenarios without any cloud cost
- Multi-node setup is just a config file away — see the KIND docs for `extraMounts` and worker node config
