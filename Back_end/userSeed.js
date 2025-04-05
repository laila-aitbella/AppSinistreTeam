import User from './models/userModels.js';

import bcrypt from 'bcrypt'
import connectTodatabase from './db/db.js'
const unserRegister=async()=> {
    connectTodatabase();
    try {

const hashPassword=await bcrypt.hash("wassima2002",10)
const  newUser=new User({ //cette page pour l'admin
    cin:"wassima",
    password:hashPassword,
    role: "user"
})
await newUser.save();
    }catch(error) {
        console.log(error)
    }
}
unserRegister();