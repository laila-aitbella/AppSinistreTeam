import React from "react";

import WelcomeBanner from "../Componnents/WelcomeBanner";
import SinistreButton from "../Componnents/SinistreButton";
import NotificationButton from "../Componnents/NotificationButton";
import HistoriqueButton from "../Componnents/HistoriqueButton";

const UserDashboard = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <WelcomeBanner />

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
      </div>
    </div>
  );
};

export default UserDashboard;
