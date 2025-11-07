const isLocal = window.location.hostname === 'localhost';

const BACKEND_URL = isLocal
  ? 'http://localhost:5000'             // Local development
  : 'http://192.168.49.2:30606';       // Minikube NodePort for backend

export default BACKEND_URL;
