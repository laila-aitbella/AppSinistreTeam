import React, { useState, useEffect } from "react";
import { FaFileAlt } from "react-icons/fa";
import { createPortal } from "react-dom"; // ✅ très important
import UpdateUser from "./updateUser";

const ButtonUpdate = () => {
  const [open, setOpen] = useState(false);

  // 🔒 Empêcher le scroll du background quand modal est ouvert
  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [open]);

  return (
    <>
      <button onClick={() => setOpen(true)} className="dashboard-btn">
        <FaFileAlt style={{ marginRight: "8px" }} />
        Modifier vos données
      </button>

      {open && createPortal(
        <div className="custom-modal">
          <UpdateUser onClose={() => setOpen(false)} />
        </div>,
        document.body
      )}
    </>
  );
};

export default ButtonUpdate;
