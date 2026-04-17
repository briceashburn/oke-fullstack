#!/bin/bash

# OKE Fullstack - Deploy backend and frontend to Oracle Kubernetes Cluster

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"
DOCKER_USERNAME="briceashburn"

echo "================================"
echo "OKE Fullstack - Kubernetes Deploy"
echo "================================"
echo ""

# Check prerequisites
echo "Checking prerequisites..."
command -v docker >/dev/null 2>&1 || { echo "Docker not found."; exit 1; }
command -v kubectl >/dev/null 2>&1 || { echo "kubectl not found."; exit 1; }
echo "Docker and kubectl found"
echo ""

# --- BACKEND ---
BACKEND_IMAGE_NAME="backend"
BACKEND_IMAGE="docker.io/${DOCKER_USERNAME}/${BACKEND_IMAGE_NAME}:local-latest"
echo "Backend: -> local-latest"

docker buildx create --use --name multiarch-builder 2>/dev/null || docker buildx use multiarch-builder

cd "$BACKEND_DIR"
docker buildx build --platform linux/amd64 -t "${BACKEND_IMAGE}" --push .
echo "Backend built and pushed: ${BACKEND_IMAGE}"
echo ""

# --- FRONTEND ---
FRONTEND_IMAGE_NAME="frontend"
FRONTEND_IMAGE="docker.io/${DOCKER_USERNAME}/${FRONTEND_IMAGE_NAME}:local-latest"
echo "Frontend: -> local-latest"

cd "$FRONTEND_DIR"
docker buildx build --platform linux/amd64 -t "${FRONTEND_IMAGE}" --push .
echo "Frontend built and pushed: ${FRONTEND_IMAGE}"
echo ""

# --- DEPLOY ---
echo "Current Kubernetes context: $(kubectl config current-context)"
read -p "Deploy to cluster? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ]; then
    echo "Cancelled."
    exit 1
fi

kubectl apply -f "${BACKEND_DIR}/deployment.yaml"
kubectl apply -f "${FRONTEND_DIR}/deployment.yaml"
kubectl apply -f "${SCRIPT_DIR}/ingress.yaml"
echo "Deployments and ingress applied"
echo ""

echo "Waiting for rollouts..."
kubectl rollout status deployment/backend --timeout=5m
kubectl rollout status deployment/frontend --timeout=5m
echo ""

echo "================================"
echo "Deployment Complete!"
echo "================================"
echo ""
kubectl get service backend-service frontend-service
echo ""
echo "App live at: https://briceashburn.com"
echo ""
echo "Useful commands:"
echo "  kubectl get pods                    # View all pods"
echo "  kubectl logs -l app=backend -f     # Backend logs"
echo "  kubectl logs -l app=frontend -f    # Frontend logs"
echo ""
