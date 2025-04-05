//C’est le fichier principal du backend :

//  Importe dotenv pour accéder aux variables d’environnement (.env)
import dotenv from "dotenv";
dotenv.config(); 
import { apps } from "./routes/update.js";
//  Importe express pour créer le serveur web
import express from 'express'

// 🛡️ Importe CORS pour permettre les requêtes cross-origin (ex : React → Node)
import cors from 'cors'

// 📂 Importe le routeur d’authentification (login/register)

import authRouter from './routes/auth.js'
import sinistreRouter from "./routes/sinistre.js";
import userRoutes from "./routes/user.js";

// 🔌 Connecte à la base MongoDB avec Mongoose
import connectTodatabase from './db/db.js'
connectTodatabase()// Lance la connexion dès que le serveur démarre

// 🚀 Initialise l’application Express
const app=express()
// 🔓 Active CORS pour permettre les appels depuis le frontend (ex : localhost:5173)
app.use(cors());

// 📦 Middleware pour parser le JSON reçu dans les requêtes HTTP (req.body)
app.use(express.json());

app.use('/api/auth',authRouter)
app.use("/api/sinistres", sinistreRouter); // Expose route
app.use("/uploads", express.static("uploads"));// ⚠️ ceci est important pour les fichiers statiques !

app.use("/api/users", userRoutes);


// 🔧 Définit le port du serveur (via .env ou 3000 par défaut)
const PORT = process.env.PORT || 3000;
// 🚀 Démarre le serveur et écoute les requêtes entrantes
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});



app.use('/', apps);