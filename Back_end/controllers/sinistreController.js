import Sinistre from "../models/sinistreModel.js";

export const createSinistre = async (req, res) => {
  try {
    const { dateAccident, lieu, matricule, valeurVenale, valeurNeuve, description } = req.body;
    const files = req.files || [];

    const imagePaths = files.map(file => file.filename);

    const newSinistre = new Sinistre({
      dateAccident,
      lieu,
      matricule,
      valeurVenale,
      valeurNeuve,
      description,
      images: imagePaths,
      utilisateur: req.body.utilisateur //ajoutes l’utilisateur
    });

    await newSinistre.save();

    res.status(201).json({ success: true, message: "Sinistre déclaré avec succès." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getSinistresByUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const sinistres = await Sinistre.find({ utilisateur: userId }).sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: sinistres });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
