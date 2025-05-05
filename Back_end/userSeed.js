import User from './models/userModels.js';
import bcrypt from 'bcrypt';
import connectToDatabase from './db/db.js';

const seedUsers = async () => {
    await connectToDatabase();
    try {
        const hashUser = await bcrypt.hash("laila2002", 10);
        const hashAdmin = await bcrypt.hash("admin", 10);

        const users = [
            {
                cin: "laila",
                password: hashUser,
                name: "chaimae",
                mail: "ChaimaeLahoui1870@gmail.com",
                telephone: 212658900999,
                role: "user",
                gender: "female",
                birthdate: new Date('2002-05-04')
            },
            {
                cin: "admin",
                password: hashAdmin,
                name: "Admin User",
                mail: "admin@example.com",
                telephone: 212600000001,
                role: "admin",
                gender: "male",
                birthdate: new Date('1980-01-01')
            }
        ];

        await User.insertMany(users);
        console.log('✅ Utilisateurs enregistrés avec succès.');
    } catch (error) {
        console.log('❌ Erreur :', error);
    }
};

seedUsers();
