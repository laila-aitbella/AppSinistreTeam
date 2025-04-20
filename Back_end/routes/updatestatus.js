import { json, Router } from "express";
import express from "express";
import updateStatus from "../controllers/updateStatus.js";

import sinistreAtraite from "../controllers/allsinistre.js";

const statusupdate = Router();

// Utilisation du middleware json pour traiter les requêtes avec un corps en JSON
statusupdate.use(json());

// Route pour mettre à jour le statut d'un sinistre
statusupdate.put('/updatestatus', updateStatus);

// Route pour obtenir tous les sinistres
statusupdate.get('/sinistres', sinistreAtraite);

export default statusupdate;
