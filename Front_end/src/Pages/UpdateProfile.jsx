// src/Componnents/UpdateProfile.jsx
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";

const UpdateProfile = ({ onClose }) => {
  const { user } = useAuth();
  const [cin, setCin] = useState(user?.cin || "");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const updatedData = {};
      if (cin !== user?.cin) updatedData.cin = cin;
      if (password.trim() !== "") updatedData.password = password;

      if (Object.keys(updatedData).length === 0) {
        setErrorMsg("Aucune modification détectée.");
        return;
      }

      await axios.put(`http://localhost:3000/api/users/${user._id}`, updatedData);
      setSuccessMsg("✅ Infos mises à jour !");
      setPassword("");

      // ✅ Fermeture automatique du formulaire après 2s
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);

    } catch (err) {
      setErrorMsg("❌ Une erreur est survenue !");
      console.error(err);
    }
  };

  return (
    <div className="form-container-modern">
      <h2>🔐 Modifier mes informations</h2>

      {successMsg && <p className="success-message">{successMsg}</p>}
      {errorMsg && <p className="error-message">{errorMsg}</p>}

      <form onSubmit={handleUpdate} className="form-modern">
        <label>Numéro CIN</label>
        <input
          type="text"
          value={cin}
          onChange={(e) => setCin(e.target.value)}
        />

        <label>Nouveau mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn-submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
