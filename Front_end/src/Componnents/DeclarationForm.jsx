import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext"; // ✅ contexte utilisateur

const DeclarationForm = ({ onClose }) => {
  const { user } = useAuth(); // 👤 utilisateur connecté
  const [formData, setFormData] = useState({
    dateAccident: "",
    lieu: "",
    matricule: "",
    valeurVenale: "",
    valeurNeuve: "",
    
    description: "",
    images: null,
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = new FormData();

      for (const key in formData) {
        if (key === "images" && formData.images) {
          for (let i = 0; i < formData.images.length; i++) {
            dataToSend.append("images", formData.images[i]);
          }
        } else {
          dataToSend.append(key, formData[key]);
        }
      }

      // ✅ ajoute l'utilisateur connecté
      dataToSend.append("utilisateur", user._id);

      const res = await axios.post("http://localhost:3000/api/sinistres", dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("✅ Sinistre déclaré avec succès !");
      setTimeout(() => {
        setSuccessMessage("");
        onClose(); // ferme le formulaire
      }, 1500);
    } catch (err) {
      alert("❌ Erreur lors de l'envoi du sinistre");
      console.error(err);
    }
  };

  return (
    <div className="form-container-modern">
      <h2>Déclaration de sinistre</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="form-modern">
        <label>Date de l'accident</label>
        <input type="date" name="dateAccident" onChange={handleChange} required />

        <label>Lieu</label>
        <input type="text" name="lieu" placeholder="Ex: Rabat" onChange={handleChange} required />

        <label>Matricule</label>
        <input type="text" name="matricule" placeholder="1234-A-56" onChange={handleChange} required />

        <label>Valeur vénale</label>
        <input type="number" name="valeurVenale" placeholder="ex: 20000" onChange={handleChange} required />

        <label>Valeur neuve</label>
        <input type="number" name="valeurNeuve" placeholder="ex: 30000" onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" rows="4" placeholder="Décris l'accident ici..." onChange={handleChange} required />

        <label>Images</label>
        <input type="file" name="images" multiple accept="image/*" onChange={handleChange} />

        <div className="btn-group">
          <button type="submit" className="btn-submit">Envoyer</button>
          <button type="button" onClick={onClose} className="btn-cancel">Annuler</button>
        </div>
      </form>
    </div>
  );
};

export default DeclarationForm;
