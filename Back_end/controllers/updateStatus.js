import Sinistre from "../models/sinistreModel.js";

const updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ message: "id et status sont requis" });
    }

    const sinistreUpdate = await Sinistre.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    if (!sinistreUpdate) {
      return res.status(404).json({ message: "Sinistre non trouvé" });
    }

    res.status(200).json({ message: "Statut mis à jour", sinistre: sinistreUpdate });
  } catch (err) {
    console.error("Erreur dans updateStatus:", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

export default updateStatus;
