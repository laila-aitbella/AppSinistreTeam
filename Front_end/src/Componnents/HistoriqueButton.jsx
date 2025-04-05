import React, { useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import HistoriqueModal from "./HistoriqueModal";

const HistoriqueButton = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="dashboard-btn" onClick={() => setShow(true)}>
        <FaRegFileAlt style={{ marginRight: "8px" }} />
        Historique
      </button>
      {show && <HistoriqueModal onClose={() => setShow(false)} />}
    </>
  );
};

export default HistoriqueButton;
