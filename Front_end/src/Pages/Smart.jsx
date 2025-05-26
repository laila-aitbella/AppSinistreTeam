import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Web3 from "web3";
import getContract from "../componentsSmart/contrat"; // Assure-toi du chemin correct

function Smart() {
  const location = useLocation();
  const montant = location.state?.montant; // Montant en ETH (string ou number)
  const [expediteur, setExpediteur] = useState(null);
  const [destinataire, setDestinataire] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadAccounts = async () => {
      if (!window.ethereum) {
        alert("MetaMask non détecté !");
        return;
      }
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const current = accounts[0];
        const last = localStorage.getItem("lastAccount");

        if (last && last !== current) {
          setExpediteur(last);
          setDestinataire(current);
        } else if (accounts[1]) {
          setExpediteur(current);
          setDestinataire(accounts[1]);
        } else {
          setExpediteur(current);
          setDestinataire(null);
        }
        localStorage.setItem("lastAccount", current);

        console.log("Comptes chargés :", {
          expediteur: last || current,
          destinataire: accounts[1] || null,
        });
      } catch (err) {
        alert("Erreur de connexion à MetaMask : " + err.message);
        console.error(err);
      }
    };
    loadAccounts();
  }, []);

  const transfereArgent = async () => {
    console.log("Tentative de transfert avec", { expediteur, destinataire, montant });

    if (!expediteur || !destinataire) {
      alert("Les comptes expéditeur ou destinataire ne sont pas prêts.");
      return;
    }
    if (!montant || isNaN(montant)) {
      alert("Montant invalide.");
      return;
    }

    const web3 = new Web3(window.ethereum);

    if (!web3.utils.isAddress(expediteur) || !web3.utils.isAddress(destinataire)) {
      alert("Adresse expéditeur ou destinataire invalide.");
      return;
    }

    const amountInWei = web3.utils.toWei(montant.toString(), "ether");
    console.log("Montant en Wei :", amountInWei);

    try {
      const contract = await getContract();
      if (!contract) throw new Error("Contrat non chargé");

      console.log("Estimation du gas pour transfer()");
      const estimatedGas = await contract.methods
        .transfer(destinataire)
        .estimateGas({ from: expediteur, value: amountInWei });

      console.log("Gas estimé :", estimatedGas);

      const receipt = await contract.methods
        .transfer(destinataire)
        .send({ from: expediteur, value: amountInWei, gas: estimatedGas });

      alert("Transfert via contrat réussi !");
      console.log("Receipt contrat :", receipt);
      setShowModal(false);
      return;
    } catch (err) {
      console.warn("Échec du transfert via contrat :", err);

      // Fallback : simple transfert ETH
      try {
        const tx = await web3.eth.sendTransaction({
          from: expediteur,
          to: destinataire,
          value: amountInWei,
        });
        alert("Transfert ETH direct réussi !");
        console.log("Receipt sendTransaction :", tx);
        setShowModal(false);
      } catch (fallbackErr) {
        alert("Erreur lors du transfert ETH direct : " + fallbackErr.message);
        console.error("Erreur sendTransaction fallback :", fallbackErr);
      }
    }
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div>
      <h2>Transfert de fonds</h2>
      <p>Expéditeur : {expediteur || "Non connecté"}</p>
      <p>Destinataire : {destinataire || "Non disponible"}</p>
      <p>Montant : {montant || "N/A"} ETH</p>
      <button onClick={toggleModal} disabled={!expediteur || !destinataire || !montant}>
        Effectuer la transaction
      </button>
{showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalCardStyle}>
            <h2 style={{ marginBottom: "20px", fontSize: "22px", color: "#333" }}>
              Confirmer la transaction
            </h2>
            <p style={{ marginBottom: "30px", fontSize: "16px", color: "#555" }}>
              Voulez-vous vraiment envoyer <strong>{montant} ETH</strong> à :
              <br />
              <span style={{ color: "#007bff", fontFamily: "monospace" }}>
                {destinataire?.slice(0, 6)}...{destinataire?.slice(-4)}
              </span> ?
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
              <button style={confirmBtnStyle} onClick={transfereArgent}>
                ✅ Confirmer
              </button>
              <button style={cancelBtnStyle} onClick={toggleModal}>
                ❌ Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// Styles inline simples pour le modal
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  backdropFilter: "blur(4px)",
};

const modalCardStyle = {
  backgroundColor: "#fff",
  padding: "32px",
  borderRadius: "14px",
  width: "420px",
  maxWidth: "90%",
  textAlign: "center",
  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
  fontFamily: "'Segoe UI', sans-serif",
  animation: "scaleIn 0.3s ease",
};

const baseBtnStyle = {
  padding: "12px 24px",
  borderRadius: "8px",
  border: "none",
  fontWeight: "600",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
};

const confirmBtnStyle = {
  ...baseBtnStyle,
  backgroundColor: "#198754",
  color: "#fff",
};

const cancelBtnStyle = {
  ...baseBtnStyle,
  backgroundColor: "#dc3545",
  color: "#fff",
};

export default Smart;


