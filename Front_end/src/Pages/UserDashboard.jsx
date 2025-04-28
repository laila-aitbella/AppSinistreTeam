import React from "react";

import WelcomeBanner from "../Componnents/WelcomeBanner";
import SinistreButton from "../Componnents/SinistreButton";
import NotificationButton from "../Componnents/NotificationButton";
import HistoriqueButton from "../Componnents/HistoriqueButton";
import ButtonUpdate from "../Componnents/ButtonUpdate";
import Footer from "../Componnents/Footer";

const UserDashboard = () => {
  return (
    <div className="user-dashboard">

      <div style={{ padding: "7rem 2rem 2rem 2rem", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
        <WelcomeBanner />

        <div className="dashboard-cards-container">

          {/* Carte 1 */}
          <div className="dashboard-card">
            <div className="card-content">
              <i className="bi bi-file-earmark-plus dashboard-icon"></i>
              <h5>Déclarer un sinistre</h5>
              <p>Commencez la déclaration de votre accident en quelques clics.</p>
            </div>
            <SinistreButton />
          </div>

          {/* Carte 2 */}
          <div className="dashboard-card">
            <div className="card-content">
              <i className="bi bi-bell dashboard-icon"></i>
              <h5>Notifications</h5>
              <p>Consultez toutes les notifications concernant votre dossier.</p>
            </div>
            <NotificationButton />
          </div>

          {/* Carte 3 */}
          <div className="dashboard-card">
            <div className="card-content">
              <i className="bi bi-clock-history dashboard-icon"></i>
              <h5>Historique</h5>
              <p>Accédez à l'historique de vos déclarations précédentes.</p>
            </div>
            <HistoriqueButton />
          </div>

          {/* Carte 4 */}
          <div className="dashboard-card">
            <div className="card-content">
              <i className="bi bi-pencil-square dashboard-icon"></i>
              <h5>Modifier vos données</h5>
              <p>Mettez à jour vos informations facilement et rapidement.</p>
            </div>
            <ButtonUpdate />
          </div>

        </div>

        <Footer />

      </div>

    </div>
  );
};

export default UserDashboard;
