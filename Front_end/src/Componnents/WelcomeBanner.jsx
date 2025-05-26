import React from "react";
import { useAuth } from "../context/authContext";

const WelcomeBanner = () => {
  const { user } = useAuth();

  return (
    <div style={styles.banner}>
      <h1 style={styles.title}>
        Bienvenue, <span style={styles.username}>{user?.cin || "Cher utilisateur"}</span>
      </h1>
      <p style={styles.subtitle}>
        Accédez à votre espace personnel et gérez vos déclarations de sinistre en toute simplicité.
      </p>
    </div>
  );
};

const styles = {
  banner: {
    background: "linear-gradient(135deg, #6c3ef4, #4f2cc2)",
    color: "#fff",
    padding: "60px 20px",
    borderRadius: "12px",
    textAlign: "center",
    marginBottom: "40px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  title: {
    fontSize: "32px",
    fontWeight: "600",
    marginBottom: "12px",
  },
  username: {
    color: "#ffc107", // jaune doré pour mettre en valeur le nom
  },
  subtitle: {
    fontSize: "16px",
    color: "#f8f9fa",
    opacity: 0.95,
  },
};

export default WelcomeBanner;
