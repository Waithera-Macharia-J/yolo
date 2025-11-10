## 🛍️ YOLO E-Commerce Web Application

### YOLO is a full-stack e-commerce product management application built using:

| Component | Technology |
|-----------|------------|
| Frontend  | React (served via NGINX) |
| Backend   | Node.js + Express |
| Database  | MongoDB |

### The project evolves across three DevOps stages:

| Stage | Tooling | Deployment |
|-------|---------|-----------|
| Stage 1 | Docker & Docker Compose | Local containerized stack |
| Stage 2 | Vagrant + Ansible | Automated provisioning & deployment |
| Stage 3 (Final) | Kubernetes + Docker Hub | Production-ready deployment (Azure AKS-ready) |

🚀 **Features**

✅ REST API for managing products  
✅ React frontend for adding/viewing inventory  
✅ MongoDB with persistent storage (PVC)  
✅ Multi-container microservice architecture  
✅ Automated infrastructure with Ansible (Stage 2)  
✅ Kubernetes deployments using Docker Hub hosted images (Stage 3)  

🗂️ **Project Structure**
yolo/
├── backend/ # Node.js API
│ ├── Dockerfile
│ └── server.js
├── client/ # React frontend
│ ├── Dockerfile
│ └── src/
├── k8s/ # Kubernetes manifests (Stage 3)
│ ├── mongo-pvc.yaml
│ ├── mongo-statefulset.yaml
│ ├── mongo-service.yaml
│ ├── backend-deployment.yaml
│ ├── backend-service.yaml
│ ├── frontend-deployment.yaml
│ └── frontend-service.yaml
├── ansible/ # Automated provisioning (Stage 2)
│ ├── playbook.yml
│ └── roles/
│ ├── docker/
│ ├── app/
│ └── setup-mongodb/
├── docker-compose.yaml # Multi-service orchestration (Stage 1)
├── explanation.md # Technical documentation
└── README.md # User guide (this file)

yaml
Copy code

⚙️ **Prerequisites**

| Required for | Tools Needed |
|--------------|--------------|
| Stage 1 (Docker) | Docker + Docker Compose |
| Stage 2 (Automation) | Vagrant + VirtualBox + Ansible |
| Stage 3 (Kubernetes) | kubectl + Azure CLI |

---

### ✅ Stage 1: Run Locally (Docker Compose)

1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/yolo.git
cd yolo
2️⃣ Build the containers

bash
Copy code
docker compose build
3️⃣ Start the app

bash
Copy code
docker compose up
4️⃣ Access the application

Service	URL
Frontend (React)	http://localhost:3000
Backend API	http://localhost:5000/api/products
MongoDB	Internal hostname: mongodb://app-ip-mongo:27017/yolomy

✅ Stage 2: Automatic Deployment (Vagrant + Ansible)
bash
Copy code
vagrant up
vagrant provision
This installs Docker automatically inside the VM and deploys all containers.

✅ Stage 3: Kubernetes Deployment (Docker Hub + Azure AKS)
Images are pushed to Docker Hub:

Service	Image
Backend	waitheramacharia/yolo-backend:v2
Frontend	waitheramacharia/yolo-frontend:v2

Kubernetes manifests are stored in /k8s.

1️⃣ Connect to your AKS cluster

bash
Copy code
az aks get-credentials --resource-group yolo-rg --name yolo-aks
2️⃣ Apply manifests

bash
Copy code
kubectl apply -f k8s/
3️⃣ Verify pods are running

bash
Copy code
kubectl get pods
Example Output

sql
Copy code
NAME                            READY   STATUS    RESTARTS   AGE
mongo-0                         1/1     Running   0          10m
yolo-backend-7546954966-v9mv2   1/1     Running   0          2m
yolo-frontend-9f8f696f4-9vtn5   1/1     Running   0          10m
4️⃣ Check services and external IPs

bash
Copy code
kubectl get svc
Example Output

nginx
Copy code
NAME            TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)        AGE
backend-lb      LoadBalancer   10.0.48.24     64.236.120.46   5000:30332/TCP  5m
yolo-frontend   LoadBalancer   10.0.194.173   64.236.107.172  80:30702/TCP    5m
mongo           ClusterIP      10.0.187.90    <none>           27017/TCP       10m
5️⃣ Test backend

bash
Copy code
curl http://64.236.120.46:5000/
Expected Output

arduino
Copy code
✅ YOLO Backend is running!
6️⃣ Test frontend
Open your browser and go to:

cpp
Copy code
http://64.236.107.172/
🧪 API Testing

List products:

bash
Copy code
curl http://64.236.120.46:5000/api/products
Create a product:

bash
Copy code
curl -X POST http://64.236.120.46:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Sample","price":20,"quantity":2,"category":"test"}'
💡 Final Deployment Check on Azure AKS

bash
Copy code
# Check pods
kubectl get pods

# Check services and external IPs
kubectl get svc

# Test backend connectivity
curl http://64.236.120.46:5000/

# Test frontend in browser
http://64.236.107.172/
If all pods are Running and you can access the backend and frontend via the external IPs, your app is fully deployed on Azure.

🐳 Docker Hub Repository

Service	Docker Hub URL
Backend	https://hub.docker.com/r/waitheramacharia/yolo-backend
Frontend	https://hub.docker.com/r/waitheramacharia/yolo-frontend

Pull images manually:

bash
Copy code
docker pull waitheramacharia/yolo-backend:v2
docker pull waitheramacharia/yolo-frontend:v2

Azure https://portal.azure.com/#@jwaitheramachariagmail.onmicrosoft.com/resource/subscriptions/d0ed2302-bfbe-49ae-a913-2b0c8132c29e/resourceGroups/yolo-rg/providers/Microsoft.ContainerService/managedClusters/yolo-aks/workloads

🧑‍💻 Author

Waithera Macharia
GitHub: @waitheramacharia
Docker Hub: waitheramacharia