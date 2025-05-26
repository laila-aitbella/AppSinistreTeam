// 📦 Importe dotenv pour les variables d’environnement
import dotenv from "dotenv";
dotenv.config();

// 📦 Importe express pour créer le serveur web
import express from 'express';
import cors from 'cors';

// 📦 Importe les routes et modèles
import { forgetP } from "./routes/forget.js";
import { apps } from "./routes/update.js";
import authRouter from './routes/auth.js';
import sinistreRouter from "./routes/sinistre.js";
import userRoutes from "./routes/user.js";
import constateurRoutes from "./routes/constateur.js";
import statusupdate from "./routes/updatestatus.js";
import notificationRoutes from "./routes/notificationsRoute.js";

import User from './models/userModels.js';
import Sinistre from './models/sinistreModel.js';




// 🔌 Connexion à la base MongoDB
import connectTodatabase from './db/db.js';
connectTodatabase();

// 🚀 Initialise Express
const app = express();

// 🔓 Active CORS et JSON parser
app.use(cors());
app.use(express.json());

// 📌 Monte les routes principales
app.use('/api/auth', authRouter);
app.use('/api/sinistres', sinistreRouter);
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);
app.use('/api/constateur', constateurRoutes);
app.use("/notifications", notificationRoutes);



// 📌 Monte les routes principales APRÈS
app.use('/', apps);
app.use('/', forgetP);
app.use('/', statusupdate);

//app.use('/notifications', notificationRoutes); // ✅ AJOUTE CETTE LIGNE

// 🚀 Démarre le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
