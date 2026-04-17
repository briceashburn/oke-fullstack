#!/bin/bash

# Hello World App - Deploy to Oracle Kubernetes Cluster
# This script builds a multi-architecture Docker image and deploys it

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BACKEND_DIR="$SCRIPT_DIR/backend"
IMAGE_NAME="hello-world-app"
DOCKER_USERNAME="briceashburn"

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
