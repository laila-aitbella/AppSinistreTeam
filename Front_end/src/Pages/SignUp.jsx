import React, { useState } from "react";
import { TbLockPassword } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import Button from "../Componnents/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";

// Importation des composants Modal de react-bootstrap
import { Modal, Button as BootstrapButton } from "react-bootstrap";
import Forget from './Forget'; // Importer le composant Forget (qui contient le formulaire de récupération)

const SignUp = () => {
  const [cin, setCIN] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // État pour contrôler la visibilité du modal
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Pour stocker l'utilisateur connecté

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        cin,
        password,
      });

      if (response.data.success) {
        // ✅ Stocker l'utilisateur dans le contexte
        login(response.data.user);

        // ✅ (Optionnel) Sauvegarder le token
        localStorage.setItem("token", response.data.token);

        // 🔁 Rediriger selon le rôle
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
    <div className="login-container">
      <h2 className="form-title">Login avec votre compte</h2>

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
          <i><FaRegUserCircle fontSize={24} /></i>
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
          <i><TbLockPassword fontSize={24} /></i>
        </div>

        <a href="#" onClick={handleShowModal} className="forgot-pass-link">Reference oublié ?</a>

        <Button text="Log In" />
      </form>

      <p className="signup-text">
        Vous n'avez pas de compte ? <a href="#">Inscrivez-vous</a>
      </p>

      {/* Modal pour la récupération du mot de passe */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        centered 
        size="sm" // Taille petite du modal
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">🔐 Récupération de mot de passe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* On affiche ici le composant Forget qui contient le formulaire de récupération */}
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
