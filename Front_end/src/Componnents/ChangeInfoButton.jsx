// src/Components/ChangeInfoButton.jsx
import React, { useState } from "react";
import { FaKey } from "react-icons/fa";
import UpdateProfile from "../Pages/UpdateProfile";


const ChangeInfoButton = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="dashboard-btn" onClick={() => setShow(true)}>
        <FaKey style={{ marginRight: "8px" }} />
        Changer mes infos
      </button>
      {show && <UpdateProfile onClose={() => setShow(false)} />}
    </>
  );
};

export default ChangeInfoButton;
