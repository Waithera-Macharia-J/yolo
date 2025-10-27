Explanation of YOLO E-commerce Project Setup
1. Project Overview

The YOLO web application is a full-stack e-commerce platform containerized using Docker and automated with Ansible on a Vagrant virtual machine.
It consists of three microservices:

Frontend – React application (client/)

Backend – Node.js + Express API (backend/)

Database – MongoDB (roles/setup-mongodb/)

All services run in isolated Docker containers and communicate over a user-defined Docker network (app-net).

2. Git Workflow and Project Evolution

The project was developed in two stages, with clear, descriptive commits showing progression.

Stage 1: Base Setup & Dockerization

809ba30 – Initialize project using Create React App

dc0b1c0 – Initial commit with project structure

2fbaef7 – Add frontend components

0e667db – Backend configuration setup

969e526 – Folder structure improvement

be57582 – Add explanation.md to guide project steps

3ba2b8e – Update README.md with user instructions

3040f0d – Finalize Docker setup and documentation

Stage 2: Stage Two Enhancements

5a93370 – Add MongoDB role and setup container

3e99f62 – Clean up unused Ansible roles and configs

1ceeea5 → 4f0e39f – Update backend/frontend deployment tasks, Vagrantfile, inventory.yml, and MongoDB healthchecks

4864411 – Stage 2 checkpoint for all updates

This workflow ensures at least 10 descriptive commits per rubric, showing project evolution from initial setup to Stage 2 deployment.

3. Folder Structure
yolo/
├── backend/               # Node.js Express API
│   ├── Dockerfile
│   └── server.js
├── client/                # React frontend
│   ├── Dockerfile
│   └── src/
├── ansible/               # Ansible playbooks
│   ├── playbook.yml
│   └── inventory
├── roles/
│   ├── docker/            # Installs Docker & configures user
│   ├── app/               # Clones repo and deploys containers
│   ├── backend-deployment/
│   ├── frontend-deployment/
│   └── setup-mongodb/     # MongoDB container role (Stage 2)
├── docker-compose.yaml    # Orchestrates all services
├── explanation.md         # Technical report
└── README.md              # User guide

4. Docker Setup and Architecture
4.1 Base Images
Service	Base Image	Reason
Frontend	node:14-alpine → nginx:1.25-alpine	Lightweight build, Nginx for production static files
Backend	node:14-alpine → alpine:3.16.7	Small runtime, separates build from production
MongoDB	mongo:5.0	Official image with persistent storage via volumes
4.2 Networking

User-defined Docker bridge network (app-net) ensures inter-container communication.

Containers connect using hostnames instead of IPs.

Example: backend connects to MongoDB via app-ip-mongo.

4.3 Volumes

Persistent data stored in app-mongo-data volume ensures data survives container restarts.

4.4 Docker Compose

Commands:

docker compose build
docker compose up


Backend waits for database readiness.

Frontend waits for backend availability.

Multi-stage builds reduce image size and improve security.

5. Ansible & Vagrant
Roles

docker – installs Docker and adds vagrant user to docker group.

app – clones repository and starts containers via Docker Compose.

backend-deployment – configures backend container deployment tasks.

frontend-deployment – configures frontend container deployment tasks.

setup-mongodb – Stage 2 role to run MongoDB container with healthchecks.

Playbook Execution
vagrant up
vagrant provision


Ensures VM is provisioned, Docker is installed, and containers are deployed.

6. Testing & Verification

After running docker compose up, test:

Frontend: http://localhost:3000

Backend API: http://localhost:5000/api/products

Test MongoDB via backend API:

curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "Docker Test Product",
    "price": 10.99,
    "quantity": 5,
    "category": "demo"
  }'

7. Docker Hub Images
Service	Docker Hub
Frontend	waitheramacharia/yolo-client

Backend	waitheramacharia/yolo-backend
8. Challenges & Solutions
Challenge	Solution
Port conflicts	Stop old containers (docker compose down)
npm ci failing	Replaced with npm install --production
Database not connecting	Use internal hostname app-ip-mongo instead of localhost
MongoDB container unhealthy	Added proper healthcheck in Stage 2
9. Conclusion

This project demonstrates a fully containerized, versioned, and automated deployment of the YOLO web app.
Using Docker, Docker Compose, Ansible, and Vagrant ensures:

Reproducible environments

Easy scalability

Clear separation of services

Robust project workflow with descriptive commits

🧑‍💻 Author

Waithera Macharia