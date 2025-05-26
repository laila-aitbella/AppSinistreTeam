import React from "react";
import WelcomeBanner from "../Componnents/WelcomeBanner";
import SinistreButton from "../Componnents/SinistreButton";
import NotificationButton from "../Componnents/NotificationButton";
import HistoriqueButton from "../Componnents/HistoriqueButton";
import ButtonUpdate from "../Componnents/ButtonUpdate";
import Footer from "../Componnents/Footer";

const UserDashboard = () => {
  return (
    <div style={styles.wrapper}>
      <WelcomeBanner />

      <h2 style={styles.sectionTitle}>Votre espace personnel</h2>

      <div style={styles.cardContainer}>
        {/* Carte 1 */}
        <div style={styles.card}>
          <i className="bi bi-file-earmark-plus" style={styles.icon}></i>
          <h5 style={styles.cardTitle}>Déclarer un sinistre</h5>
          <p style={styles.cardText}>Commencez la déclaration de votre accident en quelques clics.</p>
          <SinistreButton />
        </div>

        {/* Carte 2 */}
        <div style={styles.card}>
          <i className="bi bi-bell" style={styles.icon}></i>
          <h5 style={styles.cardTitle}>Notifications</h5>
          <p style={styles.cardText}>Consultez toutes les notifications concernant votre dossier.</p>
          <NotificationButton />
        </div>

        {/* Carte 3 */}
        <div style={styles.card}>
          <i className="bi bi-clock-history" style={styles.icon}></i>
          <h5 style={styles.cardTitle}>Historique</h5>
          <p style={styles.cardText}>Accédez à l'historique de vos déclarations précédentes.</p>
          <HistoriqueButton />
        </div>

        {/* Carte 4 */}
        <div style={styles.card}>
          <i className="bi bi-pencil-square" style={styles.icon}></i>
          <h5 style={styles.cardTitle}>Modifier vos données</h5>
          <p style={styles.cardText}>Mettez à jour vos informations facilement et rapidement.</p>
          <ButtonUpdate />
        </div>
      </div>

      <Footer />
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "6rem 2rem 2rem",
    backgroundColor: "#f8f9fa",
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
    margin: "20px 0 40px",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
    padding: "0 2rem",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  icon: {
    fontSize: "32px",
    color: "#6c3ef4",
    marginBottom: "16px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#333",
  },
  cardText: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "16px",
  },
};

export default UserDashboard;
