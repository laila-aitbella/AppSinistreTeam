import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";

const HistoriqueModal = ({ onClose }) => {
  const { user } = useAuth();
  const [sinistres, setSinistres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`http://localhost:3000/api/sinistres/${user._id}`);
        setSinistres(res.data.data);
      } catch (error) {
        console.error("Erreur lors du chargement des sinistres :", error);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="custom-modal">
      <div className="form-container-modern" style={{ maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
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

        <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          📜 Historique de mes sinistres
        </h2>

        {sinistres.length === 0 ? (
          <p>Vous n’avez encore déclaré aucun sinistre.</p>
        ) : (
          sinistres.map((s, i) => (
            <div key={i} className="historique-item">
              <p><strong>Date d'accident :</strong> {new Date(s.dateAccident).toLocaleDateString()}</p>
              <p><strong>Lieu d'accident :</strong> {s.lieu}</p>
              <p><strong>Matricule :</strong> {s.matricule}</p>
              <p><strong>Statut :</strong> {s.status || "En attente"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoriqueModal;
