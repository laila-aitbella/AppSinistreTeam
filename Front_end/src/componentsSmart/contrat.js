import Web3 from "web3";
import ContractABI from "../abis/Transfer.json"; // Assurez-vous que le chemin est correct.

const contractAddress = "0xBF75b882588c25f1224C8B1293bA3B1b22f709A1";

const getContract = async () => {
  if (window.ethereum) {
    try {
      // Demander l'accès à MetaMask
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Initialiser Web3 avec MetaMask
      const web3 = new Web3(window.ethereum);

      // Vérifier si l'ABI et l'adresse sont corrects
      if (!ContractABI.abi || ContractABI.abi.length === 0) {
        throw new Error("ABI non valide !");
      }

      // Créer une instance du contrat
      const contract = new web3.eth.Contract(ContractABI.abi, contractAddress);

      return contract;
    } catch (error) {
      console.error("Erreur lors de la connexion au contrat :", error);
      return null; // Retourner null en cas d'erreur
    }
  } else {
    console.error("MetaMask non détecté !");
    return null;
  }
};

export default getContract;
