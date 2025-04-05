// src/Pages/UserDashboard.jsx
import React, { useState } from "react";

import WelcomeBanner from "../Componnents/WelcomeBanner";
import SinistreButton from "../Componnents/SinistreButton";
import NotificationButton from "../Componnents/NotificationButton";
import HistoriqueButton from "../Componnents/HistoriqueButton";
import ChangeInfoButton from "../Componnents/ChangeInfoButton";
import UpdateProfile from "../Pages/UpdateProfile";

const UserDashboard = () => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  return (
    <div style={{ padding: "2rem" }}>
      <WelcomeBanner />

      {/* ✅ Si showUpdateForm est vrai => afficher uniquement le formulaire */}
      {showUpdateForm ? (
        <UpdateProfile onClose={() => setShowUpdateForm(false)} />
      ) : (
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "2rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <SinistreButton />
          <NotificationButton />
          <HistoriqueButton />
          <ChangeInfoButton onClick={() => setShowUpdateForm(true)} />
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
