import React, { useState } from "react";
import NotificationModal from "./NotificationModal";

const NotificationButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="dashboard-btn" onClick={() => setOpen(true)}>
        🔔 Notifications
      </button>
      {open && <NotificationModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default NotificationButton;
