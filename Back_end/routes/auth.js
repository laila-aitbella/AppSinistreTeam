//Définit les routes de l’API pour l’authentification.
//Ce fichier utilise authController.js pour traiter les requêtes.

import express from 'express'// 📦 Importe Express pour créer un routeur
import {login} from '../controllers/authController.js'// 📥 Importe la fonction `login` depuis le contrôleur (logique métier)
// 🚏 Initialise un routeur Express
const router = express.Router();//	Permet de regrouper des routes dans un fichier séparé


// 🔐 Déclare une route POST /login qui utilise la fonction `login`
// Quand un client envoie une requête POST à /api/auth/login, cette fonction est exécutée
router.post('/login', login);


export default router;//Permet d’inclure ce routeur dans index.js 