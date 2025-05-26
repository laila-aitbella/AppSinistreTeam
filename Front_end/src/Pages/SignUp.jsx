import React, { useState } from "react";
import { TbLockPassword } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { Modal, Button as BootstrapButton } from "react-bootstrap";
import Forget from "./Forget";

const SignUp = () => {
  const [cin, setCIN] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", { cin, password });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        const role = response.data.user.role;
        navigate(role === "admin" ? "/AdminDashboard" : "/UserDashboard");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Erreur serveur");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Connexion à votre compte</h2>

        {error && <p style={errorStyle}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <FaRegUserCircle size={20} style={iconStyle} />
            <input
              type="text"
              placeholder="Numéro d'identité"
              value={cin}
              onChange={(e) => setCIN(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <TbLockPassword size={20} style={iconStyle} />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ textAlign: "right", marginBottom: "10px" }}>
            <a href="#" onClick={() => setShowModal(true)} style={forgotLinkStyle}>
              Mot de passe oublié ?
            </a>
          </div>

          <button type="submit" style={submitButtonStyle}>
            Se connecter
          </button>
        </form>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>🔐 Récupération de mot de passe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Forget />
        </Modal.Body>
        <Modal.Footer>
          <BootstrapButton variant="secondary" onClick={() => setShowModal(false)}>
            Fermer
          </BootstrapButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUp;
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#f4f4f8",
};

const cardStyle = {
  background: "#fff",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "400px",
};

const titleStyle = {
  marginBottom: "24px",
  fontSize: "22px",
  textAlign: "center",
  color: "#333",
};

const inputGroupStyle = {
  position: "relative",
  marginBottom: "20px",
};

const iconStyle = {
  position: "absolute",
  top: "50%",
  left: "12px",
  transform: "translateY(-50%)",
  color: "#5F41E4",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px 10px 38px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const forgotLinkStyle = {
  fontSize: "13px",
  color: "#5F41E4",
  textDecoration: "none",
};

const submitButtonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#5F41E4",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
};

const errorStyle = {
  color: "#dc3545",
  textAlign: "center",
  marginBottom: "15px",
};
