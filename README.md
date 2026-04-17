# Hello World Python App - Oracle Kubernetes Deployment

This project contains a simple Python FastAPI application that says "Hello World" and is ready to be deployed to an Oracle Kubernetes cluster.

## Project Structure

- `app.py` - FastAPI application with `/`, `/health`, and `/readiness` endpoints
- `requirements.txt` - Python dependencies (FastAPI, Uvicorn)
- `Dockerfile` - Docker image definition
- `deployment.yaml` - Kubernetes Deployment and Service manifests
- `quick-deploy.sh` - Automated build, push, and deploy script

## Prerequisites

- Docker installed and running
- kubectl configured to access your Oracle Kubernetes cluster
- Access to Docker Hub (default) or another container registry

## Step 1: Start Docker Daemon

On macOS, you can start Docker using:

```bash
open /Applications/Docker.app
```

Wait a few seconds for Docker to fully start.

## Step 2: Deploy with the Script

From the project directory:

```bash
./quick-deploy.sh
```

- This script will build the Docker image, auto-increment the version tag, push to Docker Hub, update the manifest, and deploy to your cluster.
- Confirm the deployment when prompted.

## Step 3: Access the Application

Check the status of your deployment:

```bash
kubectl get deployments
kubectl get services
```

Get the external IP address:

```bash
kubectl get service hello-world-service
```

Once you have the EXTERNAL-IP, access the application:

```bash
curl http://<EXTERNAL-IP>
# Should return: {"message": "Hello World!", ...}
```

## Monitoring

View pod status:

```bash
kubectl get pods -l app=hello-world
```

View logs:

```bash
kubectl logs -l app=hello-world
```

View detailed pod information:

```bash
kubectl describe pods -l app=hello-world
```

## Cleanup

To remove the application from your cluster:

```bash
kubectl delete -f deployment.yaml
```
