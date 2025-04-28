import React, { useState, useEffect } from "react";
import { FaKey } from "react-icons/fa";
import { createPortal } from "react-dom";
import UpdateProfile from "../Pages/UpdateProfile";

const ChangeInfoButton = () => {
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
        <FaKey style={{ marginRight: "8px" }} />
        Changer mes infos
      </button>

      {show && createPortal(
        <div className="custom-modal">
          <UpdateProfile onClose={() => setShow(false)} />
        </div>,
        document.body
      )}
    </>
  );
};

export default ChangeInfoButton;
