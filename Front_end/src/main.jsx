import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AuthProvider from "./context/authContext"; // ✅ Ton AuthProvider personnalisé
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Bootstrap normal
import 'bootstrap-icons/font/bootstrap-icons.css'; // ✅ Bootstrap icons

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* 🔥 App est protégé par ton Provider d'auth */}
      <App />
    </AuthProvider>
  </StrictMode>
);
