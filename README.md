# oke-fullstack

A fullstack monorepo deployed on Oracle Kubernetes Engine (OKE) with a FastAPI backend and frontend, served through NGINX Ingress at [briceashburn.com](https://briceashburn.com).

## Structure

```
oke-fullstack/
├── backend/                  # FastAPI application
│   ├── app.py                # API with /, /health, /readiness endpoints
│   ├── requirements.txt      # Python dependencies (FastAPI, Uvicorn)
│   ├── Dockerfile            # Multi-arch Docker image (linux/amd64)
│   └── deployment.yaml       # Kubernetes Deployment, Service, Ingress
├── frontend/                 # Frontend application (coming soon)
├── quick-deploy.sh           # Automated build, push, and deploy script
└── README.md
```

## Prerequisites

- Docker installed and running
- kubectl configured to access your Oracle Kubernetes cluster
- Docker Hub account

## Deploy

```bash
./quick-deploy.sh
```

This script will:
- Read the current image tag from `backend/deployment.yaml`
- Auto-increment the patch version (e.g. `1.0.14` → `1.0.15`)
- Build a multi-arch Docker image (`linux/amd64`) and push to Docker Hub
- Update the manifest with the new tag
- Apply the deployment to your OKE cluster and wait for rollout

## Infrastructure

- **Cloud:** Oracle Cloud Infrastructure (OCI)
- **Kubernetes:** Oracle Kubernetes Engine (OKE)
- **Ingress:** NGINX Ingress Controller with LoadBalancer (`64.181.211.83`)
- **DNS/CDN:** Cloudflare (`briceashburn.com`)
- **Registry:** Docker Hub (`briceashburn/hello-world-app`)

## Monitoring

```bash
kubectl get pods -l app=hello-world        # View pods
kubectl logs -l app=hello-world -f         # View logs
kubectl describe pods -l app=hello-world   # Detailed pod info
```

## Cleanup

```bash
kubectl delete -f backend/deployment.yaml
```

## Cleanup

To remove the application from your cluster:

```bash
kubectl delete -f deployment.yaml
```
