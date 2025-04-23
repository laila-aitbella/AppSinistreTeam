// 📦 Import du modèle Mongoose Constateur
import Constateur from "../models/constateurModel.js";

// 🎯 Fonction pour vérifier si un constateur existe dans la base
export const verifyConstateur = async (req, res) => {
  // 📝 Récupère l'ID envoyé dans le corps de la requête
  const { constateurId } = req.body;

  try {
    // 🔍 Recherche du constateur dans la base MongoDB
    const constateur = await Constateur.findOne({ constateurId });

    // ❌ Si non trouvé, retourne une erreur 404
    if (!constateur) {
      return res.status(404).json({ message: "Constateur introuvable" });
    }

    // ✅ Si trouvé, retourne un message de succès + les infos du constateur
    res.status(200).json({ message: "Constateur vérifié", constateur });
  } catch (error) {
    // ⚠️ En cas d'erreur serveur, renvoyer une réponse d'erreur
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
