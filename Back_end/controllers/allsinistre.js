// controllers/allsinistre.js
import Sinistre from "../models/sinistreModel.js";  // ⋙ veillez à inclure .js si vous êtes en ESM

const sinistreAtraite = async (req, res) => {
  try {
    // On récupère tous les sinistres "en cours"
    const sinistres = await Sinistre.find({ status: "en cours" });

    if (sinistres.length > 0) {
      // Envoyer la liste des sinistres
      return res.status(200).json(sinistres);
    } else {
      // Aucun sinistre trouvé
      return res.status(200).send("Pas de sinistres enregistrés");
    }
  } catch (err) {
    console.error("Erreur dans sinistreAtraite:", err);
    // Erreur serveur
    return res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

export default sinistreAtraite;
