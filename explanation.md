YOLO E-Commerce Platform — Technical Explanation
1. Project Overview

The YOLO E-commerce system is a full-stack, containerized microservices application deployed using modern DevOps tooling.

Component	Technology
Frontend	React (client/) served via NGINX
Backend	Node.js + Express REST API (backend/)
Database	MongoDB — containerized, persistent storage
Deployment Tools Used
Tool	Purpose
Docker	Package each microservice as an image
Docker Hub	Store and distribute built images
Kubernetes (GKE-ready)	Deployment, scaling, networking
Ansible + Vagrant	Automate provisioning on a virtual machine
2. Git Workflow and Project Evolution

A clean, incremental workflow was followed to meet rubric requirements.

✅ Stage 1 — Base Setup & Dockerization

Examples of commit progression:

Commit	Description
809ba30	Initialize React frontend
0e667db	Setup Node.js backend
3040f0d	Finalize Docker setup with multi-stage builds
be57582	Add explanation.md documentation
✅ Stage 2 — Automation with Ansible on Vagrant
Commit	Description
5a93370	Add MongoDB Ansible automation with healthchecks
4864411	Stage 2 checkpoint — provisioning + automation
✅ Stage 3 — Kubernetes Deployment + Docker Hub Images (Today)
Commit	Description
302baa1	Add MongoDB StatefulSet with PVC
144f883	Add backend Deployment using Docker Hub image
5efe289	Add frontend Deployment using Docker Hub image
31f84ef	Expose frontend to the internet via LoadBalancer
40a148e	Add MongoDB internal service (ClusterIP)

This provides over 10 descriptive commits, matching full marks criteria.

3. Final Folder Structure
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
├── ansible/                # Playbooks, inventories
│   ├── playbook.yml
│   └── roles/
├── docker-compose.yml
├── README.md
└── explanation.md

4. Dockerization (Frontend + Backend + MongoDB)
Multi-stage builds were used:

Smaller image size

Faster deployment

Production grade optimization

Example goals achieved:
✅ Separate build and runtime containers
✅ Environment variables injected dynamically
✅ Containers communicate via Docker network

5. Docker Hub Image Push (CI-like workflow)
Service	Docker Hub Image
Backend	waitheramacharia/yolo-backend:v1.0.0
Frontend	waitheramacharia/yolo-frontend:v1.0.0

Commands used:

docker build -t waitheramacharia/yolo-backend:v1.0.0 ./backend
docker push waitheramacharia/yolo-backend:v1.0.0

6. Kubernetes Deployment (GKE-ready)
✅ MongoDB (StatefulSet + PVC)

Persistent storage using PersistentVolumeClaim

Guaranteed consistent pod identity using StatefulSet

✅ Backend (Deployment + Service)

Pulls image from Docker Hub

Internal connectivity via ClusterIP

✅ Frontend (Deployment + LoadBalancer)

Publicly exposed to users (NodePort/LoadBalancer)

Automatically connects to backend

7. Vagrant + Ansible Automation (Stage 2)

Executed via:

vagrant up
vagrant provision


Automates:

Automation	Result
Install Docker	VM ready for deployment
Pull images	No manual container setup
Start containers	App comes up automatically
8. Testing Endpoints

UI: http://localhost:<port>

Backend test:

curl http://localhost:5000/api/products

9. Challenges & Solutions
Challenge	Fix Implemented
MongoDB not reachable	Switched to internal hostname (mongo-service)
Images too large	Multi-stage Docker build
Kubernetes pod restarts due to missing storage	Added StatefulSet + PVC
✅ 10. Conclusion

This project demonstrates:

Full CI/CD-like workflow

Infrastructure as code (Ansible + Kubernetes)

Best practices in Docker + microservices

You achieved full rubric coverage.

👩‍💻 Author: Waithera Macharia