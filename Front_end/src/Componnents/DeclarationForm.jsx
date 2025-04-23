// 🔧 Nouveau modèle restructuré du formulaire React avec 5 sections logiques

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import jsPDF from "jspdf";

const DeclarationForm = ({ onClose }) => {
  const { user } = useAuth();

  const [constateurId, setConstateurId] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    cin: "",
    telephone: "",
    marque: "",
    matricule: "",
    valeurNeuve: "",
    nomConducteur: "",
    prenomConducteur: "",
    ageConducteur: "",
    permis: "",
    vehiculeEndommage: "",
    degats: "",
    images: null,
    dateAccident: "",
    lieu: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files : value,
    }));
  };

  const handleVerifyConstateur = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/constateur/verify", {
        constateurId
      });
      if (res.status === 200) {
        alert("✅ Constateur vérifié");
        setIsVerified(true);
      }
    } catch {
      alert("❌ Identifiant constateur invalide !");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    dataToSend.append("utilisateur", user._id);

    try {
      const res = await axios.post("http://localhost:3000/api/sinistres", dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("✅ Sinistre déclaré avec succès !");
      const sinistreId = res.data._id;
      const today = new Date();
      const formattedDate = today.toLocaleDateString("fr-FR");

      const doc = new jsPDF();
      const logo = new Image();
      logo.src = "/logo.png";

      logo.onload = () => {
        doc.addImage(logo, "PNG", 15, 10, 30, 30);
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Déclaration de Sinistre", 60, 25);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`ID du sinistre : ${sinistreId}`, 20, 50);
        doc.text(`Date : ${formattedDate}`, 20, 58);

        let y = 70;
        const lineHeight = 8;
        const champs = [
          `Nom : ${formData.nom}`,
          `Prénom : ${formData.prenom}`,
          `CIN : ${formData.cin}`,
          `Téléphone : ${formData.telephone}`,
          `Marque : ${formData.marque}`,
          `Matricule : ${formData.matricule}`,
          `Valeur neuve : ${formData.valeurNeuve}`,
          `Nom conducteur : ${formData.nomConducteur}`,
          `Prénom conducteur : ${formData.prenomConducteur}`,
          `Âge conducteur : ${formData.ageConducteur}`,
          `Permis : ${formData.permis}`,
          `Véhicule endommagé : ${formData.vehiculeEndommage}`,
          `Dégâts : ${formData.degats}`,
          `Date accident : ${formData.dateAccident}`,
          `Lieu : ${formData.lieu}`,
          `Description :`
        ];

        champs.forEach((champ) => {
          doc.text(champ, 20, y);
          y += lineHeight;
        });

        const descLines = doc.splitTextToSize(formData.description, 170);
        doc.text(descLines, 25, y);
        y += descLines.length * lineHeight;

        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("laila assurance – 2025 ©", 105, 280, { align: "center" });
        doc.save(`sinistre_${sinistreId}.pdf`);
      };
    } catch (err) {
      alert("❌ Erreur lors de l'envoi du sinistre");
      console.error(err);
    }

    setTimeout(() => {
      setSuccessMessage("");
      onClose();
    }, 1500);
  };

  return (
    <div className="form-container-modern">
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          background: "none",
          border: "none",
          fontSize: "1.8rem",
          cursor: "pointer",
          color: "#999",
        }}
      >
        &times;
      </button>

      {!isVerified ? (
        <>
          <h2>🛡️ Vérification du constateur</h2>
          <p>Veuillez entrer l'identifiant du constateur pour accéder au formulaire de sinistre.</p>
          <input
            type="text"
            placeholder="ID du constateur"
            value={constateurId}
            onChange={(e) => setConstateurId(e.target.value)}
          />
          <button onClick={handleVerifyConstateur} className="btn-submit">Vérifier</button>
        </>
      ) : (
        <>
          <h2>Déclaration de sinistre</h2>
          {successMessage && <p className="success-message">{successMessage}</p>}

          <form onSubmit={handleSubmit} className="form-modern">
            <h3>👤 Informations sur l’assuré</h3>
            <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required />
            <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} required />
            <input type="text" name="cin" placeholder="CIN" onChange={handleChange} required />
            <input type="tel" name="telephone" placeholder="Téléphone" onChange={handleChange} required />

            <h3>🚗 Informations sur le véhicule assuré</h3>
            <input type="text" name="marque" placeholder="Marque du véhicule" onChange={handleChange} required />
            <input type="text" name="matricule" placeholder="Matricule" onChange={handleChange} required />
            <input type="number" name="valeurNeuve" placeholder="Valeur neuve (€)" onChange={handleChange} required />

            <h3>🧍‍♂️ Informations sur le conducteur (si différent)</h3>
            <input type="text" name="nomConducteur" placeholder="Nom du conducteur" onChange={handleChange} />
            <input type="text" name="prenomConducteur" placeholder="Prénom du conducteur" onChange={handleChange} />
            <input type="number" name="ageConducteur" placeholder="Âge" onChange={handleChange} />
            <input type="text" name="permis" placeholder="Permis de conduire" onChange={handleChange} />

            <h3>🛠 Dégâts matériels</h3>
            <select name="vehiculeEndommage" onChange={handleChange} required>
              <option value="">Véhicule endommagé ?</option>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
            <textarea name="degats" placeholder="Nature des dégâts" onChange={handleChange} />
            <input type="file" name="images" multiple accept="image/*" onChange={handleChange} />

            <h3>⚠️ Circonstances de l’accident</h3>
            <input type="date" name="dateAccident" onChange={handleChange} required />
            <input type="text" name="lieu" placeholder="Lieu" onChange={handleChange} required />
            <textarea name="description" rows="4" placeholder="Décris l'accident ici..." onChange={handleChange} required />

            <div className="btn-group">
              <button type="submit" className="btn-submit">Envoyer</button>
              <button type="button" onClick={onClose} className="btn-cancel">Annuler</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default DeclarationForm;
