import express from "express";
import { updateUser } from "../controllers/updateUser.js";
import { getUser } from "../controllers/updateUser.js"; // Assure-toi que la méthode getUser existe

const apps = express();
apps.use(express.json());

// Route pour mettre à jour un utilisateur
apps.post("/update", updateUser);

// Route pour récupérer un utilisateur par son CIN
apps.get("/getuser/:cin", getUser);  // Ajout du paramètre dynamique :cin

export { apps };
