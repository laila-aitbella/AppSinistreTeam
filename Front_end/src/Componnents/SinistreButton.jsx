import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import DeclarationForm from "./DeclarationForm";

const SinistreButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="dashboard-btn">
        <FaFileAlt style={{ marginRight: "8px" }} />
        Déclarer un sinistre
      </button>

      {open && (
        <div className="custom-modal">
          <DeclarationForm onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
};

export default SinistreButton;
