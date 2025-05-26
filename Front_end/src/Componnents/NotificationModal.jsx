import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

const NotificationModal = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?._id) {
      fetch(`http://localhost:3000/notifications/user/${user._id}`)
        .then(res => res.json())
        .then(data => setNotifications(data))
        .catch(err => console.error(err));
    }
  }, [user]);

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <h3 style={{ marginBottom: "10px" }}>📬 Vos notifications</h3>
        <button style={closeBtn} onClick={onClose}>Fermer</button>
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {notifications.length === 0 ? (
            <p>Aucune notification</p>
          ) : (
            notifications.map(n => (
              <div key={n._id} style={notifStyle}>
                <p>{n.message}</p>
                <small>{new Date(n.date).toLocaleString()}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const modalStyle = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
};

const contentStyle = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  padding: "20px",
  width: "400px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.2)"
};

const closeBtn = {
  background: "transparent",
  border: "none",
  fontWeight: "bold",
  float: "right",
  fontSize: "16px",
  cursor: "pointer"
};

const notifStyle = {
  backgroundColor: "#f1f1f1",
  padding: "10px",
  marginBottom: "8px",
  borderRadius: "6px"
};

export default NotificationModal;
