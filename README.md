# oke-fullstack

A fullstack monorepo deployed on Oracle Kubernetes Engine (OKE) with a FastAPI backend and Next.js frontend, served through NGINX Ingress at [briceashburn.com](https://briceashburn.com).

## Structure

```
oke-fullstack/
├── backend/                  # FastAPI application
│   ├── app.py                # API with /health, /readiness endpoints
│   ├── requirements.txt      # Python dependencies (FastAPI, Uvicorn)
│   ├── Dockerfile            # Multi-arch Docker image (linux/amd64)
│   └── deployment.yaml       # Kubernetes Deployment, Service, Ingress
├── frontend/                 # Next.js application
│   ├── app/                  # Next.js app directory
│   ├── public/               # Static assets
│   ├── Dockerfile            # Multi-arch Docker image (linux/amd64)
│   └── deployment.yaml       # Kubernetes Deployment, Service
├── quick-deploy.sh           # Automated build, push, and deploy script
├── .gitignore
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

- Auto-increment the patch version for both backend and frontend
- Build multi-arch Docker images (`linux/amd64`) and push to Docker Hub
- Update both manifests with the new tags
- Apply deployments to your OKE cluster and wait for rollout

## Routing

| Path     | Service  |
| -------- | -------- |
| `/`      | frontend |
| `/api/*` | backend  |

## Infrastructure

- **Cloud:** Oracle Cloud Infrastructure (OCI)
- **Kubernetes:** Oracle Kubernetes Engine (OKE)
- **DNS/CDN:** Cloudflare (`briceashburn.com`)
- **Registry:** Docker Hub (`briceashburn/backend`, `briceashburn/frontend`)

## Monitoring

```bash
kubectl get pods                           # View all pods
kubectl logs -l app=backend -f             # Backend logs
kubectl logs -l app=frontend -f            # Frontend logs
kubectl describe pods -l app=backend       # Backend pod details
kubectl describe pods -l app=frontend      # Frontend pod details
```

## Cleanup

```bash
kubectl delete -f backend/deployment.yaml
kubectl delete -f frontend/deployment.yaml
```
