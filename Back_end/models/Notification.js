import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sinistreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sinistre', required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// ✅ Crée le modèle
const Notification = mongoose.model("Notification", notificationSchema);

// ✅ Exporte par défaut
export default Notification;
