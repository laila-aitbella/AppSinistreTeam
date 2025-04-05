import mongoose from "mongoose";

const sinistreSchema = new mongoose.Schema({
  dateAccident: { type: Date, required: true },
  lieu: { type: String, required: true },
  matricule: { type: String, required: true },
  valeurVenale: { type: Number, required: true },
  valeurNeuve: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], // pour stocker les noms ou URLs d'images
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },//utilisateur (clé étrangère) qui référence l'utilisateur (collection users
  createdAt: { type: Date, default: Date.now }
});

const Sinistre = mongoose.model("Sinistre", sinistreSchema);

export default Sinistre;
