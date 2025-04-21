import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UpdateUser.css";
import { useAuth } from "../context/authContext"; // ✅ contexte utilisateur

const UpdateUser = ({ onClose }) => {
  const { user } = useAuth(); // Utilisateur connecté
  const cin = user?.cin;  // Récupérer le cin de l'utilisateur connecté
  const [formData, setFormData] = useState({
    password: "",
    name: "",
    mail: "",
    telephone: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Récupérer les données de l'utilisateur actuel
  useEffect(() => {
    const fetchUserData = async () => {
      if (!cin) {
        setErrorMessage("❌ Cin non trouvé !");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/getuser/${cin}`);
        setFormData(response.data);
      } catch (error) {
        setErrorMessage("❌ Erreur de récupération des données utilisateur.");
      }
    };

    if (cin) {
      fetchUserData();
    }
  }, [cin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = { ...formData, cin }; // Assure-toi d'inclure le CIN
      const response = await axios.post(`http://localhost:3000/update`, updatedData);
      setSuccessMessage("✅ Informations mises à jour avec succès !");
      setTimeout(() => {
        setSuccessMessage("");
        onClose(); // Ferme le formulaire
      }, 1500);
    } catch (err) {
      setErrorMessage("❌ Erreur lors de la mise à jour des informations.");
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Modifier les Informations Utilisateur</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="form">
        <label>Mot de passe</label>
        <input
          type="password"
          name="password"
          value={formData.password_hash}
          onChange={handleChange}
          required
          placeholder="Mot de passe"
        />

        <label>Nom</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Nom complet"
        />

        <label>Email</label>
        <input
          type="email"
          name="mail"
          value={formData.mail}
          onChange={handleChange}
          required
          placeholder="Email"
        />

        <label>Téléphone</label>
        <input
          type="tel"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          required
          placeholder="Numéro de téléphone"
        />

        <div className="btn-group">
          <button type="submit" className="btn-submit">
            Enregistrer les modifications
          </button>
          <button type="button" onClick={onClose} className="btn-cancel">
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
