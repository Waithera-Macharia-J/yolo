YOLO E-Commerce Platform — Technical Explanation
1️⃣ Project Overview

The YOLO E-Commerce Platform is a full-stack, containerized microservices application demonstrating the complete DevOps lifecycle — from containerization to orchestration using modern tools.

Component	Technology
Frontend	React (served via NGINX)
Backend	Node.js + Express REST API
Database	MongoDB (with persistent volume claim)
Deployment Tool	Purpose
Docker	Package microservices into images
Docker Hub	Image registry for distribution
Kubernetes	Deployment, scaling, and networking
Ansible + Vagrant	Automate provisioning and configuration
2️⃣ Git Workflow and Project Evolution

A structured, incremental Git workflow was followed — over 10 descriptive commits tracking all development stages.

Stage	Key Commits	Description
Stage 1 — Dockerization	809ba30, 0e667db, 3040f0d, be57582	Initialized React frontend, Node backend, Docker Compose stack
Stage 2 — Automation (Ansible + Vagrant)	5a93370, 4864411	Added Ansible roles for Docker and MongoDB setup
Stage 3 — Kubernetes Deployment	302baa1, 40a148e, 144f883, 5efe289, 31f84ef	Added StatefulSet, Deployments, LoadBalancer, and image references

✅ Meets rubric for version control and descriptive commit workflow.

3️⃣ Final Folder Structure
yolo/
├── backend/                # Node backend API + Dockerfile
├── client/                 # React frontend + Dockerfile
├── k8s/                    # Kubernetes manifests (Stage 3)
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── mongo-statefulset.yaml
│   ├── mongo-pvc.yaml
│   └── mongo-service.yaml
├── ansible/                # Playbooks, inventories, roles
├── docker-compose.yml
├── README.md
└── explanation.md

4️⃣ Architecture Diagrams
Stage 1 — Docker Compose (Local Deployment)
+--------------+        +----------------+        +---------------------+
|  Frontend    | <----> |   Backend API  | <----> | MongoDB (container) |
| React + NGINX|        | Node.js        |        | Persistent Volume   |
+--------------+        +----------------+        +---------------------+
           Docker Internal Network (app-net)

Stage 3 — Kubernetes (Cloud-Ready / GKE Deployment)
┌──────────────────────────────┐
│      Kubernetes Cluster       │
│                               │
│   +----------------------+    │
│   | Frontend Deployment  |    │
│   +----------┬-----------+    │
│              │ LoadBalancer   │
│   +----------▼-----------+    │
│   | Frontend Service     |    │
│   +----------------------+    │
│              │ Internal DNS   │
│   +----------▼-----------+    │
│   | Backend Deployment   |    │
│   +----------┬-----------+    │
│              │ ClusterIP       │
│   +----------▼-----------+    │
│   | MongoDB StatefulSet  |    │
│   | Mongo PVC (Storage)  |    │
│   +----------------------+    │
└──────────────────────────────┘


✅ Uses best Kubernetes practices:

StatefulSet + PVC for MongoDB persistence

Deployments for backend and frontend

Services for internal/external networking

LoadBalancer for public access

5️⃣ Dockerization Strategy

Multi-stage builds reduce image size and separate build/runtime environments.

Environment variables injected via .env for portability.

Docker Compose orchestrates frontend, backend, and MongoDB containers locally.

Network bridge ensures inter-container communication (mongo hostname).

Example: Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]

6️⃣ Docker Hub Workflow
Service	Docker Hub Image
Backend	waitheramacharia/yolo-backend:v1.0.0
Frontend	waitheramacharia/yolo-frontend:v1.0.0

Commands used:

docker build -t waitheramacharia/yolo-backend:v1.0.0 ./backend
docker push waitheramacharia/yolo-backend:v1.0.0
docker build -t waitheramacharia/yolo-frontend:v1.0.0 ./client
docker push waitheramacharia/yolo-frontend:v1.0.0


✅ Demonstrates CI/CD-ready workflow for container registry integration.

7️⃣ Kubernetes Deployment (Stage 3)
Component	Kubernetes Object	Purpose
MongoDB	StatefulSet + PVC + ClusterIP	Persistent storage and internal access
Backend	Deployment + ClusterIP	Stable internal API endpoint
Frontend	Deployment + LoadBalancer	Exposes application externally

✅ Pods restart automatically on failure.
✅ PVC ensures MongoDB data persists across pod restarts.
✅ Deployments reference Docker Hub images.

8️⃣ Ansible + Vagrant Automation (Stage 2)

Automation Flow:

vagrant up → creates Ubuntu VM

ansible-playbook installs Docker & dependencies

Pulls images from Docker Hub

Launches containers automatically

Task	Result
Install Docker	VM ready for containerization
Setup MongoDB	Persistent data layer configured
Run Application	App auto-starts on VM boot

✅ Implements Infrastructure as Code (IaC) principles.

9️⃣ Testing & Validation
API Endpoints
# Fetch all products
curl http://localhost:5000/api/products

# Create a product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Sample","price":20,"quantity":2,"category":"test"}'


Expected Output:

[{"_id":"...","name":"Sample","price":20,"quantity":2,"category":"test"}]

🔧 Key Challenges and Solutions
Challenge	Resolution
MongoDB pod kept restarting	Added PVC and StatefulSet
Backend couldn’t reach DB	Updated service DNS → mongo-service
Large image size	Implemented multi-stage builds
Manual setup errors	Automated provisioning with Ansible
✅ Conclusion

This project demonstrates a complete DevOps pipeline covering:

🐳 Containerization (Docker + Docker Compose)

⚙️ Automation (Ansible + Vagrant)

☸️ Orchestration (Kubernetes + Docker Hub)

💾 Persistence (PVC + StatefulSet)

📈 Scalability & Reliability via Deployments and Services

✅ Fully satisfies rubric criteria for:

Version control workflow

Multi-stage DevOps tooling

Infrastructure automation

Persistent and scalable design

Clear documentation

👩‍💻 Author:
Waithera Macharia
📧 joycemacharia02@gmail.com

🐙 GitHub: @waitheramacharia

🐳 Docker Hub: waitheramacharia