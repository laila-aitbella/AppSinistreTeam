import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Web3 from "web3";
import getContract from "./contrat";

function Transfer() {
  const location = useLocation();
  const montant = location.state?.montant; // montant en ETH (string ou number)
  const [expediteur, setExpediteur] = useState(null);
  const [destinataire, setDestinataire] = useState(null);
  const [showModal, setShowModal] = useState(false); // état pour afficher ou masquer le modal

  // Récupère les comptes MetaMask et stocke expediteur/destinataire
  useEffect(() => {
    const loadAccounts = async () => {
      if (!window.ethereum) {
        console.error("MetaMask non détecté");
        return;
      }
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
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
        console.log("Comptes chargés :", { expediteur: last || current, destinataire: accounts[1] || current });
      } catch (err) {
        console.error("Erreur de connexion à MetaMask :", err);
      }
    };
    loadAccounts();
  }, []);

  const transfereArgent = async () => {
    if (!expediteur || !destinataire) {
      console.error("Comptes non prêts", { expediteur, destinataire });
      return;
    }
    if (!montant || isNaN(montant)) {
      console.error("Montant invalide :", montant);
      return;
    }

    const web3 = new Web3(window.ethereum);

    // Validation des adresses
    if (!web3.utils.isAddress(expediteur) || !web3.utils.isAddress(destinataire)) {
      console.error("Adresse invalide", { expediteur, destinataire });
      return;
    }

    const amountInWei = web3.utils.toWei(montant.toString(), "ether");
    console.log("Montant en Wei :", amountInWei);

    try {
      // 1️⃣ Essai appel contrat
      const contract = await getContract();
      if (contract) {
        console.log("Test estimation de gas pour transfer()…");
        const estGas = await contract.methods
          .transfer(destinataire)
          .estimateGas({ from: expediteur, value: amountInWei });
        console.log("Gas estimé :", estGas);

        console.log("Exécution de contract.methods.transfer…");
        const receipt = await contract.methods
          .transfer(destinataire)
          .send({ from: expediteur, value: amountInWei, gas: estGas });
        console.log("Receipt from contract transfer :", receipt);
        return;
      }
      throw new Error("Impossible de récupérer le contrat");
    } catch (err) {
      console.warn("Échec du transfert via contrat :", err);

      // 2️⃣ Fallback : simple transfert ETH
      try {
        console.log("Fallback > web3.eth.sendTransaction…");
        const tx = await web3.eth.sendTransaction({
          from: expediteur,
          to: destinataire,
          value: amountInWei,
        });
        console.log("Receipt from sendTransaction :", tx);
      } catch (err2) {
        console.error("Erreur sendTransaction fallback :", err2);
      }
    }
  };

  // Fonction pour afficher ou masquer le modal
  const toggleModal = () => setShowModal(!showModal);

  return (
    <div>
      <h2>Transfert de fonds</h2>
      <p>Expéditeur : {expediteur}</p>
      <p>Destinataire : {destinataire}</p>
      <p>Montant : {montant} ETH</p>
      <button onClick={toggleModal}>Effectuer la transaction</button>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirmer la transaction</h3>
            <p>
              Voulez-vous vraiment envoyer {montant} ETH à {destinataire} ?
            </p>
            <button onClick={transfereArgent}>Confirmer</button>
            <button onClick={toggleModal}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transfer;
