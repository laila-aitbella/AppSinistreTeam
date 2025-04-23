import mongoose from "mongoose";

const sinistreSchema = new mongoose.Schema({
  // Assuré
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  cin: { type: String, required: true },
  telephone: { type: String, required: true },

  // Véhicule
  marque: { type: String, required: true },
  matricule: { type: String, required: true },
  valeurNeuve: { type: Number, required: true },

  // Conducteur (optionnel)
  nomConducteur: String,
  prenomConducteur: String,
  ageConducteur: Number,
  permis: String,

  // Dégâts matériels
  vehiculeEndommage: String, // "oui" ou "non"
  degats: String,

  // Circonstances de l'accident
  dateAccident: { type: Date, required: true },
  lieu: { type: String, required: true },
  description: { type: String, required: true },

  // Fichiers et utilisateur
  images: [{ type: String }],
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // Système
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "en cours", enum: ["en cours", "acceptee", "refus"] },
  montant: { type: Number }
});

// 💡 Calcul automatique du montant
sinistreSchema.pre("save", function (next) {
  if (this.valeurNeuve) {
    this.montant = 0.2 * this.valeurNeuve;
  }
  next();
});

const Sinistre = mongoose.model("Sinistre", sinistreSchema);
export default Sinistre;
