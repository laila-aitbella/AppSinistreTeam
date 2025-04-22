import mongoose from "mongoose";

const sinistreSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  cin: { type: String, required: true },
  telephone: { type: String, required: true },
  marque: { type: String, required: true },
  dateAccident: { type: Date, required: true },
  lieu: { type: String, required: true },
  matricule: { type: String, required: true },
  valeurNeuve: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "en cours", enum: ["en cours", "acceptee", "refus"] },
  montant: { type: Number }
});

sinistreSchema.pre("save", function (next) {
  if (this.valeurNeuve) {
    this.montant = 0.2 * this.valeurNeuve; // 💡 ou ta logique métier réelle
  }
  next();
});



const Sinistre = mongoose.model("Sinistre", sinistreSchema);

export default Sinistre;
