import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext"; // ✅ contexte utilisateur
import jsPDF from "jspdf"; //pour pdf 


const DeclarationForm = ({ onClose }) => {
  const { user } = useAuth(); // 👤 utilisateur connecté
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    cin: "",
    telephone: "",
    marque : "",
    dateAccident: "",
    lieu: "",
    matricule: "",
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
      const sinistreId = res.data._id; // récupère l'ID du sinistre depuis la réponse

setSuccessMessage("✅ Sinistre déclaré avec succès !");

// génère le PDF avec l'ID dans le nom
const doc = new jsPDF();
doc.setFontSize(14);
doc.text("Déclaration de Sinistre", 20, 20);
doc.text(`ID du sinistre : ${sinistreId}`, 20, 30);
doc.text(`Nom : ${formData.nom}`, 20, 40);
doc.text(`Prénom : ${formData.prenom}`, 20, 50);
doc.text(`CIN : ${formData.cin}`, 20, 60);
doc.text(`Téléphone : ${formData.telephone}`, 20, 70);
doc.text(`Marque : ${formData.marque}`, 20, 80);
doc.text(`Date de l'accident : ${formData.dateAccident}`, 20, 90);
doc.text(`Lieu : ${formData.lieu}`, 20, 100);
doc.text(`Matricule : ${formData.matricule}`, 20, 110);
doc.text(`Valeur neuve : ${formData.valeurNeuve}`, 20, 120);
doc.text(doc.splitTextToSize(`Description : ${formData.description}`, 170), 20, 130);

doc.save(`sinistre_${sinistreId}.pdf`);

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
      <label>Nom</label>
        
        
      <input type="text" name="nom" onChange={handleChange} required />

      <label>Prénom</label>
      <input type="text" name="prenom" onChange={handleChange} required />

      <label>CIN</label>
      <input type="text" name="cin" onChange={handleChange} required />

      <label>Téléphone</label>
      <input type="tel" name="telephone" onChange={handleChange} required />

      <label>Marque du véhicule</label>
       <input type="text" name="marque" onChange={handleChange} required />

        <label>Date de l'accident</label>
        <input type="date" name="dateAccident" onChange={handleChange} required />

        <label>Lieu</label>
        <input type="text" name="lieu" placeholder="Ex: Rabat" onChange={handleChange} required />

        <label>Matricule</label>
        <input type="text" name="matricule" placeholder="1234-A-56" onChange={handleChange} required />

        

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
