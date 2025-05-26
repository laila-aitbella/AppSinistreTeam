import React from "react";
import Navbar from "../Componnents/Navbar";
import { FaLinkedin, FaEnvelope, FaInstagram, FaFacebook } from "react-icons/fa";

const Contact = () => {
  const iconStyle = {
    fontSize: "32px",
    margin: "0 16px",
    color: "#2f3e46",
    transition: "color 0.3s ease",
  };

  const iconHoverStyle = {
    color: "#5F41E4",
  };

  return (
    <>
  
      <div style={containerStyle}>
        <h1 style={titleStyle}>Contactez-nous</h1>
        <p style={textStyle}>Vous pouvez nous joindre sur les réseaux suivants :</p>
        <div style={iconContainerStyle}>
          <a href="https://www.linkedin.com/in/wassima-mhanni-a20270250/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin style={iconStyle} onMouseOver={(e) => e.currentTarget.style.color = "#0a66c2"} onMouseOut={(e) => e.currentTarget.style.color = "#2f3e46"} />
          </a>
          <a href="mhanniwassima3@gmail.com">
            <FaEnvelope style={iconStyle} onMouseOver={(e) => e.currentTarget.style.color = "#c71610"} onMouseOut={(e) => e.currentTarget.style.color = "#2f3e46"} />
          </a>
          <a href="https://www.instagram.com/tonprofil" target="_blank" rel="noopener noreferrer">
            <FaInstagram style={iconStyle} onMouseOver={(e) => e.currentTarget.style.color = "#e1306c"} onMouseOut={(e) => e.currentTarget.style.color = "#2f3e46"} />
          </a>
          <a href="https://www.facebook.com/tonprofil" target="_blank" rel="noopener noreferrer">
            <FaFacebook style={iconStyle} onMouseOver={(e) => e.currentTarget.style.color = "#1877f2"} onMouseOut={(e) => e.currentTarget.style.color = "#2f3e46"} />
          </a>
        </div>
      </div>
    </>
  );
};

// 🎨 Styles inline
const containerStyle = {
  textAlign: "center",
  padding: "40px",
  fontFamily: "'Segoe UI', sans-serif",
};

const titleStyle = {
  fontSize: "32px",
  marginBottom: "12px",
  color: "#2f3e46",
};

const textStyle = {
  fontSize: "16px",
  marginBottom: "24px",
  color: "#555",
};

const iconContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "24px",
};

export default Contact;
