// 📦 Import d'Express et du contrôleur
import express from "express";
import { verifyConstateur } from "../controllers/constateurController.js";

// ⚙️ Initialisation du routeur Express
const router = express.Router();

// 🔗 Déclaration de la route POST /verify pour vérifier un constateur
// Cette route appelle la fonction verifyConstateur quand un POST est fait
router.post("/verify", verifyConstateur);

// ✅ Exportation du routeur pour qu'il soit utilisé dans index.js
export default router;
