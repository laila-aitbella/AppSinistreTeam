import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import UpdateUser from "./updateUser";


const ButtonUpdate = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="dashboard-btn">
        <FaFileAlt style={{ marginRight: "8px" }} />
        Modifier vos donnees
      </button>

      {open && (
        <div className="custom-modal">
          <UpdateUser onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
};

export default ButtonUpdate;
