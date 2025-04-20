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
  createdAt: { type: Date, default: Date.now },
  status:{type:String,default:"en cours",enum:["en cours","acceptee","refus"]},
  montant:{type:Number}

});
sinistreSchema.pre("save", function (next) {
  if (this.valeurNeuve && this.valeurVenale) {
    this.montant = 0.2 * (this.valeurNeuve - this.valeurVenale);
  }
  next();
});


const Sinistre = mongoose.model("Sinistre", sinistreSchema);

export default Sinistre;
