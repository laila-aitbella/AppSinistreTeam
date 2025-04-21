import bcrypt from 'bcryptjs'; // Assurez-vous d'importer bcryptjs pour le hachage
import User from "../models/userModels.js";

export const updateUser = async (req, res) => {
  const { cin, password } = req.body;
  
  // Récupère les données de l'utilisateur à mettre à jour, sauf le mot de passe
  const userData = { ...req.body };
  
  // Vérifier si un mot de passe est fourni et le hacher si c'est le cas
  if (password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hachage avec un "salt" de 10
      userData.password = hashedPassword;
      userData.password_hash=password;
    } catch (error) {
      console.error('Erreur lors du hachage du mot de passe :', error);
      return res.status(500).json({ message: 'Erreur lors du hachage du mot de passe.' });
    }
  }
  
  try {
    // Effectue la mise à jour de l'utilisateur
    const updated = await User.findOneAndUpdate(
      { cin },                // Condition pour chercher l'utilisateur
      { $set: userData },     // Mise à jour des données (avec le mot de passe haché si modifié)
      { new: true }           // Retourne l'utilisateur mis à jour
    );

    if (!updated) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Renvoie la réponse
    res.status(200).json(updated);

  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer les données de l'utilisateur par son CIN
export const getUser = async (req, res) => {
  const { cin } = req.params; // Récupère le CIN dans l'URL

  try {
    const user = await User.findOne({ cin }); // Recherche l'utilisateur par CIN

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(user); // Renvoie l'utilisateur trouvé
  } catch (err) {
    console.error("Erreur lors de la récupération des données utilisateur :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
