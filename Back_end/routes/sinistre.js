import express from "express";
import { createSinistre } from "../controllers/sinistreController.js";
import { getSinistresByUser } from "../controllers/sinistreController.js";
import multer from "multer";

const router = express.Router();

// 📦 configuration de Multer pour les fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // dossier local
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route POST pour créer un sinistre avec upload d’images
router.post("/", upload.array("images"), createSinistre);
router.get("/:userId", getSinistresByUser);

export default router;
