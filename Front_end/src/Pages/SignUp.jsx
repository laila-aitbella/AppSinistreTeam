import React, { useState } from "react";
import { TbLockPassword } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";

// Importation du modal react-bootstrap
import { Modal, Button as BootstrapButton } from "react-bootstrap";
import Forget from './Forget'; // ✅ Formulaire de récupération de mot de passe

const SignUp = () => {
  const [cin, setCIN] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Utilise ton AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        cin,
        password,
      });

      if (response.data.success) {
        // 🔥 Stocke l'utilisateur et le token proprement
        login(response.data.user); 
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);

        // 🎯 Redirige selon le rôle
        const role = response.data.user.role;
        if (role === "admin") {
          navigate("/AdminDashboard");
        } else {
          navigate("/UserDashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Erreur serveur");
      }
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div className="login-container fade-in">
      <h2 className="form-title">Connexion à votre compte</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Numéro d'Identité Nationale"
            value={cin}
            onChange={(e) => setCIN(e.target.value)}
            className="input-field"
            required
          />
          <i><FaRegUserCircle fontSize={22} color="#5F41E4" /></i> {/* Icône utilisateur */}
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <i><TbLockPassword fontSize={22} color="#5F41E4" /></i> {/* Icône mot de passe */}
        </div>

        <a href="#" onClick={handleShowModal} className="forgot-pass-link">
          Mot de passe oublié ?
        </a>

        <button type="submit" className="login-button">
          Se connecter
        </button>
      </form>

      {/* Modal récupération mot de passe */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        size="sm"
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">🔐 Récupération de mot de passe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Forget />
        </Modal.Body>
        <Modal.Footer>
          <BootstrapButton variant="secondary" onClick={handleCloseModal}>
            Fermer
          </BootstrapButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUp;
