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
        <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          📜 Historique de mes sinistres
        </h2>
        <button onClick={onClose} className="btn-cancel">Fermer</button>

        {sinistres.length === 0 ? (
          <p>Vous n’avez encore déclaré aucun sinistre.</p>
        ) : (
          sinistres.map((s, i) => (
            <div key={i} className="historique-item">
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>{new Date(s.dateAccident).toLocaleDateString()}</strong> — <span>{s.lieu}</span>
              </div>

              <div>
                🚗 <strong>{s.matricule}</strong> |
                💰 {s.valeurVenale} MAD / 🆕 {s.valeurNeuve} MAD
              </div>

              <p><em>{s.description}</em></p>

              {/* Images s'il y en a */}
              {s.images && s.images.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                  {s.images.map((img, j) =>
                    img ? (
                      <a
                        key={j}
                        href={`http://localhost:3000/uploads/${img}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={`http://localhost:3000/uploads/${img}`}
                          alt={`sinistre-${j}`}
                          style={{
                            maxWidth: "120px",
                            height: "auto",
                            borderRadius: "8px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            transition: "transform 0.3s ease",
                          }}
                          onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"}
                          onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                        />
                      </a>
                    ) : null
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoriqueModal;
