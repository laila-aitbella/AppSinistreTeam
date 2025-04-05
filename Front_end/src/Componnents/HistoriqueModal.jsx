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
    <div className="modal">
      <div className="form-container-modern">
        <h2>📜 Historique de mes sinistres</h2>
        <button onClick={onClose}>Fermer</button>

        {sinistres.length === 0 ? (
          <p>Vous n’avez encore déclaré aucun sinistre.</p>
        ) : (
          sinistres.map((s, i) => (
            <div key={i} className="historique-item">
              <strong>{new Date(s.dateAccident).toLocaleDateString()}</strong> - {s.lieu}<br />
              🚗 {s.matricule} | 💰 {s.valeurVenale} MAD / 🆕 {s.valeurNeuve} MAD  
              <br />
              <em>{s.description}</em>
              {s.images && s.images.length > 0 && (
                <div style={{ marginTop: "0.5rem" }}>
                  {s.images.map((img, j) => (
                    <img
                      key={j}
                      src={`http://localhost:3000/uploads/${img}`}
                      alt={`sinistre-${j}`}
                      style={{ maxWidth: "100px", marginRight: "10px" }}
                    />
                  ))}
                </div>
              )}
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoriqueModal;
