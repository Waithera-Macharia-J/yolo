🛍️ YOLO Web Application — README

YOLO is a full-stack product management web application built using:

Frontend: React

Backend: Node.js + Express

Database: MongoDB

The entire stack is containerized and deployed using Docker Compose, with optional provisioning via Ansible on a Vagrant VM.

🚀 Features

REST API for managing products

React frontend for viewing and adding products

Persistent MongoDB storage

Multi-container microservice setup with Docker Compose

Automated deployment using Ansible and Vagrant (Stage 2)

🏗️ Project Structure
yolo/
├── backend/               # Node.js + Express API
│   ├── Dockerfile
│   └── server.js
├── client/                # React frontend
│   ├── Dockerfile
│   └── src/
├── ansible/               # Ansible playbooks
│   ├── playbook.yml
│   └── inventory
├── roles/                 # Ansible roles
│   ├── docker/
│   ├── app/
│   ├── backend-deployment/
│   ├── frontend-deployment/
│   └── setup-mongodb/
├── docker-compose.yaml    # Multi-service orchestration
├── explanation.md         # Technical documentation
└── README.md              # User guide

⚙️ Prerequisites

Install:

Docker

Docker Compose

Vagrant
 (optional for VM deployment)

VirtualBox
 (if using Vagrant)

🧩 Setup and Run Instructions
Option 1: Local Docker Compose Deployment

1️⃣ Clone the Repository

git clone https://github.com/<your-username>/yolo.git
cd yolo


2️⃣ Build Containers

docker compose build


3️⃣ Start the Application

docker compose up


4️⃣ Access the App

Frontend: http://localhost:3000

Backend API: http://localhost:5000/api/products

MongoDB: internal hostname mongodb://app-ip-mongo:27017/yolomy

5️⃣ Test the API

List all products

curl http://localhost:5000/api/products


Add a new product

curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Sample","price":20,"quantity":2,"category":"test"}'

Option 2: Automated Deployment with Vagrant + Ansible (Stage 2)

1️⃣ Start the Vagrant VM

vagrant up


2️⃣ Provision the VM with Ansible

vagrant provision


This installs Docker inside the VM and deploys all containers (frontend, backend, MongoDB).

The same endpoints as above are available inside the VM network.

🐳 Docker Hub Images
Service	Docker Hub
Backend	waitheramacharia/yolo-backend

Frontend	waitheramacharia/yolo-client
📸 Screenshots

Insert screenshots of running containers or app interface here.

⚡ Notes & Stage Highlights

Stage 1: Basic Docker containerization of frontend, backend, and MongoDB.

Stage 2: Added Ansible roles and Vagrant provisioning for automated deployment.

Internal Docker networking ensures services communicate using container hostnames.

Multi-stage Dockerfiles reduce image size and improve security.

🧑‍💻 Author

Waithera Macharia

GitHub: @waitheramacharia

Docker Hub: waitheramacharia

🏁 Summary

This project demonstrates a reproducible, automated, and fully containerized full-stack application.

Docker Compose: Run the full stack locally with one command.

Ansible + Vagrant: Automate VM setup and container deployment (Stage 2).

Persistent data: MongoDB volumes ensure database continuity across container restarts.

If you want, I can also add a “Stage 1 vs Stage 2 Summary Table” to this README, which will explicitly show progression for the rubric and make it clear that you followed a two-stage workflow.

Do you want me to do that?

You said:
Just share a documentation I can paste that has everything I need to get the rubic points and also incorporate what I aready have from the previous project
ChatGPT said:

Absolutely! Here’s a comprehensive README + explanation documentation that you can paste into your repo. It consolidates your previous project info, Stage 1 & Stage 2 progress, Docker setup, Vagrant/Ansible workflow, testing instructions, and screenshots placeholders — everything you need for full rubric points.

🛍️ YOLO Web Application — README & Documentation
1. Overview

YOLO is a full-stack product management web application built using:

Frontend: React

Backend: Node.js + Express

Database: MongoDB

The full stack is containerized using Docker Compose and optionally deployed on a Vagrant VM using Ansible for automated provisioning (Stage 2).

Project Stages:

Stage	Description
Stage 1	Initial Docker containerization of frontend, backend, and MongoDB. Manual Docker Compose deployment.
Stage 2	Automated deployment with Ansible roles, Vagrant provisioning, network configuration, and healthchecks.
2. Features

REST API for managing products

React frontend for viewing and adding products

Persistent MongoDB storage

Multi-container microservice setup with Docker Compose

Automated deployment with Ansible + Vagrant

Docker networking between services using container hostnames

Multi-stage Dockerfiles for lightweight and secure images

3. Project Structure
yolo/
├── backend/               # Node.js + Express API
│   ├── Dockerfile
│   └── server.js
├── client/                # React frontend
│   ├── Dockerfile
│   └── src/
├── ansible/               # Ansible playbooks
│   ├── playbook.yml
│   └── inventory
├── roles/                 # Ansible roles
│   ├── docker/
│   ├── app/
│   ├── backend-deployment/
│   ├── frontend-deployment/
│   └── setup-mongodb/
├── docker-compose.yaml    # Multi-service orchestration
├── explanation.md         # Technical documentation
└── README.md              # User guide

4. Prerequisites

Docker

Docker Compose

Vagrant
 (for VM deployment)

VirtualBox
 (for VM deployment)

5. Setup and Run Instructions
Option 1: Local Docker Compose Deployment

1️⃣ Clone the repository

git clone https://github.com/<your-username>/yolo.git
cd yolo


2️⃣ Build containers

docker compose build


3️⃣ Start the application

docker compose up


4️⃣ Access the app

Frontend: http://localhost:3000

Backend API: http://localhost:5000/api/products

MongoDB: mongodb://app-ip-mongo:27017/yolomy

5️⃣ Test the API

List all products

curl http://localhost:5000/api/products


Add a product

curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Sample","price":20,"quantity":2,"category":"test"}'

Option 2: Automated Deployment with Vagrant + Ansible (Stage 2)

1️⃣ Start the VM

vagrant up


2️⃣ Provision the VM

vagrant provision


Docker is installed inside the VM.

All containers (frontend, backend, MongoDB) are automatically deployed.

Endpoints inside the VM network remain the same.

6. Docker Setup & Architecture
Frontend (client)

Base image: node:14-alpine for build → nginx:1.25-alpine for runtime

Reason: Lightweight, fast build, production-ready static file hosting

Backend (server)

Base image: node:14-alpine → alpine:3.16.7 runtime

Reason: Stable Node version, small secure runtime image

Database

Base image: mongo:5.0

Reason: Official image, persistent storage with named volumes

Networking

User-defined Docker network (app-net) for inter-container communication

Services use container names to connect instead of IPs

Volumes

Named volume app-mongo-data persists MongoDB data

Docker Compose

Automates building and running all services together

Backend waits for MongoDB; frontend waits for backend

7. Multi-Stage Builds

Frontend: Build (Node) → Runtime (Nginx)

Backend: Build (Node) → Runtime (Alpine)

Benefits: Reduced image size, improved security

8. Docker Hub Images
Service	Docker Hub
Backend	waitheramacharia/yolo-backend

Frontend	waitheramacharia/yolo-client
9. Challenges & Solutions
Challenge	Solution
Port conflicts	Stop old containers before rebuild (docker compose down)
npm ci failures	Switched to npm install --production
DB connection errors	Use internal hostname app-ip-mongo instead of localhost
MongoDB container healthcheck	Added healthcheck in Dockerfile with retry logic
10. Screenshots

Insert screenshots of running containers or app interface here.

11. Author

Waithera Macharia

GitHub: @waitheramacharia

Docker Hub: waitheramacharia

12. Summary

This project demonstrates a reproducible, automated, and fully containerized full-stack application:

Stage 1: Basic Docker containerization

Stage 2: Ansible + Vagrant automated deployment

Persistent MongoDB storage ensures data continuity

Full microservice architecture with container networking and multi-stage builds