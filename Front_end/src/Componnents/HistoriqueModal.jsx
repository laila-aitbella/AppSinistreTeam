import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";

const HistoriqueModal = ({ onClose }) => {
  const { user } = useAuth();
  const [sinistres, setSinistres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const res = await axios.get(`http://localhost:3000/api/sinistres/${user._id}`);
      setSinistres(res.data.data);
    };
    fetchData();
  }, [user]);

  return (
    <div className="custom-modal">
      <div className="form-container-modern">
        <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          📜 Historique de mes sinistres
        </h2>
        <button onClick={onClose} className="btn-cancel">Fermer</button>

        {sinistres.length === 0 ? (
          <p>Vous n’avez encore déclaré aucun sinistre.</p>
        ) : (
          sinistres.map((s, i) => (
            <div key={i} className="historique-item">
              <p><strong>Date d'accident :</strong> {new Date(s.dateAccident).toLocaleDateString()}</p>
              <p><strong>Lieu d'accident :</strong> {s.lieu}</p>

              <p><strong>Matricule :</strong> {s.matricule}</p>
              <p><strong>Statut de votre sinistre:</strong> {s.status || "En attente"}</p>
            </div>
          ))
          
        )}
      </div>
    </div>
  );
};

export default HistoriqueModal;
