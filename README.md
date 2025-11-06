## 🛍️ YOLO E-Commerce Web Application

### YOLO is a full-stack e-commerce product management application built using:

Component	Technology
Frontend	React (served via NGINX)
Backend	Node.js + Express
Database	MongoDB

### The project evolves across three DevOps stages:

Stage	Tooling	Deployment
Stage 1	Docker & Docker Compose	Local containerized stack
Stage 2	Vagrant + Ansible	Automated provisioning & deployment
Stage 3 (Final)	Kubernetes + Docker Hub	Production-ready deployment (GKE-ready)
🚀 Features

✅ REST API for managing products
✅ React frontend for adding/viewing inventory
✅ MongoDB with persistent storage (PVC)
✅ Multi-container microservice architecture
✅ Automated infrastructure with Ansible (Stage 2)
✅ Kubernetes deployments using Docker Hub hosted images (Stage 3)

🗂️ Project Structure
yolo/
├── backend/                    # Node.js API
│   ├── Dockerfile
│   └── server.js
├── client/                     # React frontend
│   ├── Dockerfile
│   └── src/
├── k8s/                        # Kubernetes manifests (Stage 3)
│   ├── mongo-pvc.yaml
│   ├── mongo-statefulset.yaml
│   ├── mongo-service.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   └── frontend-service.yaml
├── ansible/                    # Automated provisioning (Stage 2)
│   ├── playbook.yml
│   └── roles/
│       ├── docker/
│       ├── app/
│       └── setup-mongodb/
├── docker-compose.yaml         # Multi-service orchestration (Stage 1)
├── explanation.md              # Technical documentation
└── README.md                   # User guide (this file)

⚙️ Prerequisites
Required for	Tools Needed
Stage 1 (Docker)	Docker + Docker Compose
Stage 2 (Automation)	Vagrant + VirtualBox + Ansible
Stage 3 (Kubernetes)	kubectl + gcloud (GKE)
### ✅ Stage 1: Run Locally (Docker Compose)
1️⃣ Clone the repository
git clone https://github.com/<your-username>/yolo.git
cd yolo

2️⃣ Build the containers
docker compose build

3️⃣ Start the app
docker compose up

4️⃣ Access the application
Service	URL
Frontend (React)	http://localhost:3000

Backend API	http://localhost:5000/api/products

MongoDB	Internal hostname: mongodb://app-ip-mongo:27017/yolomy
### ✅ Stage 2: Automatic Deployment (Vagrant + Ansible)
vagrant up
vagrant provision


This installs Docker automatically inside the VM and deploys all containers.

### ✅ Stage 3: Kubernetes Deployment (Docker Hub + kubectl)

Images are pushed to Docker Hub:

Service	Image
Backend	waitheramacharia/yolo-backend:v1.0.0
Frontend	waitheramacharia/yolo-frontend:v1.0.0

Kubernetes manifests are stored in /k8s.

To deploy to a Kubernetes cluster:

kubectl apply -f k8s/


Verify pods:

kubectl get pods


Expose frontend (LoadBalancer):

kubectl get service frontend-service

🧪 API Testing

List products:

curl http://localhost:5000/api/products


Create a product:

curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Sample","price":20,"quantity":2,"category":"test"}'

🐳 Docker Hub Repository
Service	Docker Hub URL
Backend	https://hub.docker.com/r/waitheramacharia/yolo-backend

Frontend	https://hub.docker.com/r/waitheramacharia/yolo-frontend

Pull images manually:

docker pull waitheramacharia/yolo-backend:v1.0.0
docker pull waitheramacharia/yolo-frontend:v1.0.0


🧑‍💻 Author

Waithera Macharia
GitHub: @waitheramacharia

Docker Hub: waitheramacharia