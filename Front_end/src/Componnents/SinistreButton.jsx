import React, { useState, useEffect } from "react"; // ✅ ajouter <useEffect>
import { FaFileAlt } from "react-icons/fa";
import { createPortal } from "react-dom"; // 👈 Import du portail
import DeclarationForm from "./DeclarationForm";

const SinistreButton = () => {
  const [open, setOpen] = useState(false);

  // ✅ Bloquer le scroll de la page quand le modal est ouvert
  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Sécurité : enlever la classe quand le composant disparaît
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [open]);

  return (
    <>
      <button onClick={() => setOpen(true)} className="dashboard-btn">
        <FaFileAlt style={{ marginRight: "8px" }} />
        Déclarer un sinistre
      </button>

      {open && createPortal(
        <div className="custom-modal">
          <DeclarationForm onClose={() => setOpen(false)} />
        </div>,
        document.body // ✅ très important ici
      )}
    </>
  );
};

export default SinistreButton;
