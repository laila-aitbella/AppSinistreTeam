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
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'lahouilina@gmail.com'; // Fallback

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
  });
}

// ➤ Route : récupération du mot de passe depuis la base
export const forget = async (req, res) => {
  try {
    const { mail, password } = req.body;
    
    const user = await User.findOne({ mail }); // vérifie si login valide

    if (!user) {
      return res.status(404).send('Email non trouvé');
    }

    // Comparaison du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return res.status(200).send(user.cin); // Envoie le CIN (ou autre info selon le besoin)
    } else {
      return res.status(401).send('Mot de passe incorrect');
    }
  } catch (error) {
    console.error('Erreur forget:', error);
    return res.status(500).send('Erreur serveur');
  }
};

// ➤ Route : envoi d'email
export const send = async (req, res) => {
  const { cin, mail } = req.body;

  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: SENDER_EMAIL,
      to: mail,
      subject: 'Récupération de votre mot de passe',
      text: `Bonjour,\n\nVoici votre CIN : ${cin}\n\nMerci de le garder confidentiel.\n\nCordialement,\nSupport App`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé :', info.response);

    return res.status(200).send('Email envoyé avec succès');
  } catch (err) {
    console.error('Erreur lors de l\'envoi de l\'email :', err);
    return res.status(500).send('Erreur lors de l\'envoi de l\'email');
  }
};
