// client/src/config.js

// Detect environment: local development or production (Kubernetes)
const isLocal = window.location.hostname === 'localhost';

const BACKEND_URL = isLocal
  ? 'http://localhost:5000'    // Local development
  : 'http://yolo-backend:5000'; // Kubernetes cluster service

export default BACKEND_URL;
