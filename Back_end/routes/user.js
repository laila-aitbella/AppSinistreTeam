// routes/user.js
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModels.js";

const router = express.Router();

// 🔁 Route de mise à jour CIN ou mot de passe
router.put("/:id", async (req, res) => {
  try {
    const { cin, password } = req.body;

    const updates = {};
    if (cin) updates.cin = cin;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Erreur de mise à jour :", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

export default router;
