import express from 'express';
import { forget, send } from '../controllers/forgetpassword.js';  // Ajoute l'extension .js

const forgetP = express();
forgetP.use(express.json());
forgetP.post('/sendM',send);
forgetP.post('/forget',forget);

export {forgetP}