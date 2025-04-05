//Gère la logique métier pour l'authentification (connexion, inscription, déconnexion, etc.)*
//Il utilise userModels.js pour interagir avec MongoDB
import User from '../models/userModels.js'
import bcrypt from 'bcryptjs'// 🔐 Pour hasher et comparer les mots de passe
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const login = async (req, res) => {
    console.log("abdessmad lhma9")

    try {
        console.log(req.body)// 🔎 Affiche les données reçues dans la requête POST (cin, password)

        const { cin, password } = req.body;// 📥 Récupère les champs depuis la requête
        const user = await User.findOne({ cin });// 🔍 Cherche un utilisateur avec ce `cin` dans MongoDB
        console.log(user)// Pour debug : voir l’objet utilisateur trouvé

        if (!user) {
             // ❌ Aucun utilisateur trouvé → renvoie une erreur 404
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);// 🔐 Compare le mot de passe donné avec le hash stocké en base
        if (!isMatch) {
            // ❌ Mot de passe incorrect → erreur 400
          return   res.status(400).json({ success: false, error: "Wrong password" });
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role },// 🔐 Données encodées dans le token (payload)
            process.env.JWT_KEY,
            { expiresIn: "10d" }
        );
       // ✅ Tu envoies la réponse au frontend
        res.status(200).json({
            success: true,
            token,// ✅ JWT envoyé au client
            user: { _id: user._id,  cin: user.cin, role: user.role }
        });
    } catch (error) {
       return res.status(500).json({ success: false, error: error.message })
    }
};

export { login };
