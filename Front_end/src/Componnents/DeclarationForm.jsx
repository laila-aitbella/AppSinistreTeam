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
    marque: "",
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
      const today = new Date();
      const formattedDate = today.toLocaleDateString("fr-FR"); // ex: 22/04/2025

      // ✅ Génère le PDF avec le logo, l’ID, la date, les infos + footer
      const doc = new jsPDF();

      // 🖼️ Ajout du logo (le fichier logo.png doit être placé dans /public)
      const logo = new Image();
      logo.src = "/logo.png";

      logo.onload = () => {
        // 🧾 En-tête
        doc.addImage(logo, "PNG", 15, 10, 30, 30); // logo en haut à gauche
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Déclaration de Sinistre", 60, 25); // titre centré

        // 📄 Infos générales
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`ID du sinistre : ${sinistreId}`, 20, 50);
        doc.text(`Date de génération du PDF : ${formattedDate}`, 20, 58);

        // 📋 Champs du formulaire
        let y = 70;
        const lineHeight = 8;
        const champs = [
          `Nom : ${formData.nom}`,
          `Prénom : ${formData.prenom}`,
          `CIN : ${formData.cin}`,
          `Téléphone : ${formData.telephone}`,
          `Marque : ${formData.marque}`,
          `Date de l'accident : ${formData.dateAccident}`,
          `Lieu : ${formData.lieu}`,
          `Matricule : ${formData.matricule}`,
          `Valeur neuve : ${formData.valeurNeuve}`,
          `Description :`,
        ];

        champs.forEach((champ) => {
          doc.text(champ, 20, y);
          y += lineHeight;
        });

        // 📝 Description multiligne
        const descLines = doc.splitTextToSize(formData.description, 170);
        doc.text(descLines, 25, y);
        y += descLines.length * lineHeight;

        // 🧾 Footer
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("laila assurance – 2025 ©", 105, 280, { align: "center" });

        // 💾 Sauvegarde
        doc.save(`sinistre_${sinistreId}.pdf`);
      };
    } catch (err) {
      alert("❌ Erreur lors de l'envoi du sinistre");
      console.error(err);
    }

    setTimeout(() => {
      setSuccessMessage("");
      onClose(); // ferme le formulaire
    }, 1500);
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
