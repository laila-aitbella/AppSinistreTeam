import React from "react";
import { useAuth } from "../context/authContext"; // 👈 adapte si ton chemin diffère

const WelcomeBanner = () => {
  const { user } = useAuth();
  console.log("👤 user depuis le contexte :", user);


  return (
    <h2 style={{ textAlign: "center" }}>
      Bonjour {user?.cin || "Utilisateur"}, heureux de vous rencontrer une autre fois 👋
    </h2>
  );
};

export default WelcomeBanner;
