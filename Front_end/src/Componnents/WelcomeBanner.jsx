import React from "react";
import { useAuth } from "../context/authContext"; // adapte selon ton projet

const WelcomeBanner = () => {
  const { user } = useAuth();

  return (
    <div className="welcome-banner">
      <h1 className="welcome-title">
        Bonjour <span className="username">{user?.cin || "Utilisateur"}</span>, ravi de vous revoir
      </h1>
      <p className="welcome-subtext">
        Gérez vos sinistres en toute confiance avec AssurClaim.
      </p>
    </div>
  );
};

export default WelcomeBanner;