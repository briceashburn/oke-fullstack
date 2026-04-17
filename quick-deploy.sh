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
echo "✓ Docker and kubectl found"
echo ""

# --- BACKEND ---
BACKEND_IMAGE_NAME="backend"
BACKEND_CURRENT=$(grep 'image: docker.io/briceashburn/backend:' "${BACKEND_DIR}/deployment.yaml" | sed -E 's/.*backend:([0-9]+\.[0-9]+\.[0-9]+).*/\1/')
[ -z "$BACKEND_CURRENT" ] && BACKEND_CURRENT="1.0.0"
IFS='.' read -r MA MI PA <<< "$BACKEND_CURRENT"
PA=$((PA + 1))
BACKEND_NEW_TAG="$MA.$MI.$PA"
BACKEND_IMAGE="docker.io/${DOCKER_USERNAME}/${BACKEND_IMAGE_NAME}:$BACKEND_NEW_TAG"
echo "Backend: $BACKEND_CURRENT → $BACKEND_NEW_TAG"

docker buildx create --use --name multiarch-builder 2>/dev/null || docker buildx use multiarch-builder

cd "$BACKEND_DIR"
docker buildx build --platform linux/amd64 -t "${BACKEND_IMAGE}" --push .
sed -i '' "s|image: *docker.io/briceashburn/backend:[0-9.]*|image: ${BACKEND_IMAGE}|g" "${BACKEND_DIR}/deployment.yaml"
echo "✓ Backend built and pushed: ${BACKEND_IMAGE}"
echo ""

# --- FRONTEND ---
FRONTEND_IMAGE_NAME="frontend"
FRONTEND_CURRENT=$(grep 'image: docker.io/briceashburn/frontend:' "${FRONTEND_DIR}/deployment.yaml" | sed -E 's/.*frontend:([0-9]+\.[0-9]+\.[0-9]+).*/\1/')
[ -z "$FRONTEND_CURRENT" ] && FRONTEND_CURRENT="1.0.0"
IFS='.' read -r MA MI PA <<< "$FRONTEND_CURRENT"
PA=$((PA + 1))
FRONTEND_NEW_TAG="$MA.$MI.$PA"
FRONTEND_IMAGE="docker.io/${DOCKER_USERNAME}/${FRONTEND_IMAGE_NAME}:$FRONTEND_NEW_TAG"
echo "Frontend: $FRONTEND_CURRENT → $FRONTEND_NEW_TAG"

cd "$FRONTEND_DIR"
docker buildx build --platform linux/amd64 -t "${FRONTEND_IMAGE}" --push .
sed -i '' "s|image: *docker.io/briceashburn/frontend:[0-9.]*|image: ${FRONTEND_IMAGE}|g" "${FRONTEND_DIR}/deployment.yaml"
echo "✓ Frontend built and pushed: ${FRONTEND_IMAGE}"
echo ""

# --- DEPLOY ---
echo "Current Kubernetes context: $(kubectl config current-context)"
read -p "Deploy both to cluster? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ]; then
    echo "Cancelled."
    exit 1
fi

kubectl apply -f "${BACKEND_DIR}/deployment.yaml"
kubectl apply -f "${FRONTEND_DIR}/deployment.yaml"
echo "✓ Deployments applied"
echo ""

echo "Waiting for rollouts..."
kubectl rollout status deployment/hello-world --timeout=5m
kubectl rollout status deployment/frontend --timeout=5m
echo ""

echo "================================"
echo "✓ Deployment Complete!"
echo "================================"
echo ""
kubectl get service backend-service frontend-service
echo ""
echo "App live at: https://briceashburn.com"
echo ""

# Extract current semantic version tag from backend/deployment.yaml
CURRENT_TAG=$(grep 'image: docker.io/briceashburn/hello-world-app:' "${BACKEND_DIR}/deployment.yaml" | sed -E 's/.*hello-world-app:([0-9]+\.[0-9]+\.[0-9]+).*/\1/')
if [ -z "$CURRENT_TAG" ]; then
    CURRENT_TAG="1.0.0"
fi
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_TAG"
PATCH=$((PATCH + 1))
NEW_TAG="$MAJOR.$MINOR.$PATCH"
DOCKER_IMAGE="docker.io/${DOCKER_USERNAME}/${IMAGE_NAME}:$NEW_TAG"
echo "Current tag: $CURRENT_TAG → New tag: $NEW_TAG"
echo ""

echo "Step 1: Building multi-architecture image for AMD64..."
cd "$BACKEND_DIR"

docker buildx create --use --name multiarch-builder 2>/dev/null || docker buildx use multiarch-builder

docker buildx build --platform linux/amd64 -t "${DOCKER_IMAGE}" --push .
echo "✓ Image built and pushed: ${DOCKER_IMAGE}"
echo ""

echo "Step 2: Updating Kubernetes manifest..."
sed -i '' "s|image: *docker.io/briceashburn/hello-world-app:[0-9.]*|image: ${DOCKER_IMAGE}|g" "${BACKEND_DIR}/deployment.yaml"
sed -i '' "s|value: \"[0-9]\+\.[0-9]\+\.[0-9]\+\"|value: \"$NEW_TAG\"|g" "${BACKEND_DIR}/deployment.yaml"
echo "✓ Deployment manifest updated"
echo ""

echo "Step 3: Deploying to Oracle Kubernetes cluster..."
echo "Current Kubernetes context: $(kubectl config current-context)"
read -p "Continue with deployment? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ]; then
    echo "Cancelled."
    exit 1
fi

kubectl apply -f "${BACKEND_DIR}/deployment.yaml"
echo "✓ Deployment applied"
echo ""

echo "Step 4: Waiting for pods to be ready..."
kubectl rollout status deployment/hello-world --timeout=5m
echo ""

echo "================================"
echo "✓ Deployment Complete!"
echo "================================"
echo ""
echo "Service information:"
kubectl get service hello-world-service
echo ""
echo "Your app is running! Access it at the EXTERNAL-IP above on port 80"
echo ""
echo "Useful commands:"
echo "  kubectl get pods -l app=hello-world          # View pods"
echo "  kubectl logs -l app=hello-world -f           # View logs"
echo "  kubectl describe pods -l app=hello-world     # Detailed pod info"
echo ""
