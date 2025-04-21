import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaTimes } from "react-icons/fa"; // Ajouter l'icône de fermeture
import '../styles/ForgetP.css';

function Forget() {
  const url = "http://localhost:3000/forget"; // URL pour la récupération du mot de passe
  const url1 = "http://localhost:3000/sendM"; // URL pour l'envoi de l'email

  const [mail, setMail] = useState(""); // Email de l'utilisateur
  const [cin, setCin] = useState(""); // CIN de l'utilisateur
  const [message, setMessage] = useState(""); // Message d'état
  const [status, setStatus] = useState("info"); // Statut de l'alerte (info, success, danger)
  const [showModal, setShowModal] = useState(true); // État pour afficher/masquer le modal
  
  // Effet pour réinitialiser le message après 4 secondes
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Fonction qui gère l'envoi du formulaire
  const onSubmit = async () => {
    if (!mail || !cin) {
      setMessage("Veuillez remplir tous les champs");
      setStatus("danger");
      return;
    }
  
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mail, cin }),
      });
  
      const data = await res.text();
  
      if (res.status !== 200) {
        throw new Error(data);
      }
  
      const sendRes = await fetch(url1, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password_hash: data, mail }),
      });
  
      const result = await sendRes.text();
  
      setMessage("Email envoyé avec succès");
      setStatus("success");
      console.log("Réponse email:", result);
    } catch (error) {
      console.error("Erreur:", error);
      setMessage("Ce mail ou CIN est incorrect");
      setStatus("danger");
    }

  
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    showModal && (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="card shadow-lg p-4">
          {/* Bouton de fermeture */}
          <button
            className="btn-close"
            onClick={closeModal}
            aria-label="Close"
          >
            <FaTimes />
          </button>
          
          <h4 className="text-center mb-4">🔐 Récupération de compte</h4>

          {/* Affichage des messages d'alerte */}
          {message && (
            <div className={`alert alert-${status} text-center animated-alert`} role="alert">
              {message}
            </div>
          )}

          {/* Champ Email */}
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <FaEnvelope />
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Adresse mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>

          {/* Champ CIN (référence) */}
          <div className="mb-4 input-group">
            <span className="input-group-text">
              <FaLock />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Mot de passe"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
            />
          </div>

          {/* Bouton pour envoyer le formulaire */}
          <button className="btn btn-primary w-100" onClick={onSubmit}>
            Envoyer le code
          </button>
        </div>
      </div>
    )
  );
}

export default Forget;
