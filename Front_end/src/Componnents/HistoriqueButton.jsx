import React, { useState, useEffect } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { createPortal } from "react-dom"; // ✅ très important
import HistoriqueModal from "./HistoriqueModal";

const HistoriqueButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [show]);

  return (
    <>
      <button className="dashboard-btn" onClick={() => setShow(true)}>
        <FaRegFileAlt style={{ marginRight: "8px" }} />
        Historique
      </button>

      {show && createPortal(
        <div className="custom-modal">
          <HistoriqueModal onClose={() => setShow(false)} />
        </div>,
        document.body
      )}
    </>
  );
};

export default HistoriqueButton;
