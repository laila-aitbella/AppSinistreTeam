import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'; // Ajouter bcrypt pour la comparaison des mots de passe
import User from '../models/userModels.js';

dotenv.config(); // Charger les variables d'environnement

// Variables depuis .env
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const SENDER_EMAIL = process.env.SENDER_EMAIL ; // Fallback

// Configuration OAuth2
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Création du transporteur Nodemailer
async function createTransporter() {
  const accessToken = await oAuth2Client.getAccessToken();

  if (!accessToken?.token) {
    throw new Error('Impossible d\'obtenir un jeton d\'accès');
  }

   return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: SENDER_EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
    tls: {
      rejectUnauthorized: false, // <-- accepte les certificats non certifiés (self-signed)
    }
  });

}

// ➤ Route : récupération du mot de passe depuis la base
export const forget = async (req, res) => {
  try {
    const { mail, cin } = req.body;

    console.log('Données reçues dans forget:', mail, cin);  // ➤ Vérification des données

    // Cherche tous les utilisateurs avec le même email
    const users = await User.find({ mail });
    console.log(users);
    if (users.length === 0) {
      return res.status(404).send('Email non trouvé');
    }

    // Cherche l'utilisateur avec le CIN correspondant
    const user = users.find(u => u.cin === cin);

    if (!user) {
      return res.status(401).send('CIN incorrect');
    }

    // Vérifie si le password_hash existe
    if (!user.password_hash) {
      return res.status(500).send("Mot de passe crypté non défini");
    }

    // Envoie du hash du mot de passe
    return res.status(200).send(user.password_hash);
  } catch (error) {
    console.error('Erreur forget:', error.message, error.stack);
    return res.status(500).send('Erreur serveur');
  }
};




// ➤ Route : envoi d'email
export const send = async (req, res) => {
  const { password_hash, mail } = req.body;

  console.log("---- Données reçues dans /sendM ----");
  console.log("password_hash :", password_hash);
  console.log("mail :", mail);

  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: SENDER_EMAIL,
      to: mail,
      subject: 'Récupération de votre mot de passe',
      text: `Bonjour,\n\nVoici votre mot de passe (crypté) : ${password_hash}\n\nMerci de le garder confidentiel.\n\nCordialement,\nSupport App`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé :', info.response);

    return res.status(200).send('Email envoyé avec succès');
  } catch (err) {
    console.error("Erreur lors de l'envoi de l'email :", err.message);
    return res.status(500).send("Erreur lors de l'envoi de l'email");
  }
};
