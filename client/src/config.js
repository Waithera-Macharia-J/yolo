const isLocal = window.location.hostname === 'localhost';

const BACKEND_URL = isLocal
  ? 'http://localhost:5000'
  : 'http://192.168.49.2:30606'; // NodePort or LoadBalancer IP

export default BACKEND_URL;
