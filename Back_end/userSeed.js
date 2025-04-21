// 📦 Importe le modèle utilisateur (Mongoose)
import User from './models/userModels.js';

// 🔐 Pour hasher le mot de passe
import bcrypt from 'bcrypt';

// 🔌 Connexion à la base MongoDB Atlas
import connectTodatabase from './db/db.js'

// 🔄 Fonction pour créer un utilisateur manuellement 
const unserRegister=async()=> {
    connectTodatabase();
    try {
 // 🔐 Hash du mot de passe "wassima2002" avec un salt de 10
const hashPassword=await bcrypt.hash("laila2002",10)
const  newUser=new User({ //cette page pour l'admin
    cin:"laila",
    password:hashPassword,
<<<<<<< HEAD
    password_hash:"laila2002",
    name:"chaimae",
=======
    password_hash:"wassima2002",
>>>>>>> 2483e50dc7cb9aefde17381336324d4ab4ac7d61
    mail:"ChaimaeLahoui1870@gmail.com",
    telephone:212658900999,
    role: "user"
})
 // 💾 Enregistrement de l'utilisateur dans la base de données
await newUser.save();
    }catch(error) {
        console.log(error)
    }
}
unserRegister();