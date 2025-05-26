import express from "express";
import Notification from "../models/Notification.js"; // ✅ Utilise `export default`

const router = express.Router();

// 👉 Enregistrer une notification
router.post("/notifications", async (req, res) => {
  const { userId, sinistreId, message } = req.body;
  try {
    const notif = new Notification({
      userId,
      sinistreId,
      message,
      date: new Date(), // Ajoute la date explicitement
    });
    await notif.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 Récupérer les notifications d'un utilisateur
router.get("/notifications/user/:userId", async (req, res) => {
  try {
    const notifs = await Notification.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(notifs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 Supprimer une notification
router.delete("/notifications/:id", async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; // ✅ Ne pas utiliser `module.exports`
