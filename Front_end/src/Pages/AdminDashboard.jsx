import React, { useEffect, useState } from "react";
import '../styles/AdminDashboard.css'; // Assurez-vous d'importer un fichier CSS
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [sinistres, setSinistres] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const navigate = useNavigate();
  // Récupération des sinistres traités
  useEffect(() => {
    fetch("http://localhost:3000/sinistres", {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => setSinistres(data))
      .catch(err => console.error(err));
  }, []);

  // Met à jour le statut sélectionné pour un sinistre
  const handleStatusChange = (id, status) => {
    setSelectedStatus(prev => ({ ...prev, [id]: status }));
  };

  // Envoie la mise à jour de statut au backend
  const handleSubmit = (e, id,montant) => {
    e.preventDefault();
    const status = selectedStatus[id]; // Utilise le statut sélectionné dans l'état local
    
    fetch("http://localhost:3000/updatestatus", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, id }), // Envoie le statut et l'ID du sinistre
    })
      .then(res => res.json())
      .then(data=> {
        console.log(data);
        if (status =="acceptee")
        {console.log(montant);
        navigate('/smart', { state:  {montant}  });
        }
        

      })
      .catch(err => console.error(err));
  };

  return (
    <div className="admin-dashboard">
      <h1>Tableau de bord Admin</h1>
      {sinistres.map(sinistre => (
        <div key={sinistre._id} className="sinistre-card">
          <div className="sinistre-info">
            <p><strong>Lieu:</strong> {sinistre.lieu}</p>
            <p><strong>Date:</strong> {new Date(sinistre.dateAccident).toLocaleDateString()}</p>
            <p><strong>Matricule:</strong> {sinistre.matricule}</p>
            <p><strong>Valeur vénale:</strong> {sinistre.valeurVenale} €</p>
            <p><strong>Valeur neuve:</strong> {sinistre.valeurNeuve} €</p>
            <p><strong>Montant:</strong> {sinistre.montant} €</p>
            <p><strong>Statut actuel:</strong> {sinistre.status}</p>
          </div>
          
          <form onSubmit={e => handleSubmit(e, sinistre._id,sinistre.montant)}>
            <div className="sinistre-actions">
              <select
                value={selectedStatus[sinistre._id] || sinistre.status} // Affiche le statut actuel ou sélectionné
                onChange={e => handleStatusChange(sinistre._id, e.target.value)} // Met à jour le statut sélectionné
              >
                <option value="refus">Refus</option>
                <option value="acceptee">acceptee</option>
                <option value="en cours">En cours</option> {/* Option supplémentaire si nécessaire */}
              </select>
              <button type="submit">Mettre à jour</button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
