import mongoose from 'mongoose';
const usersShema=new mongoose.Schema(
    {
        cin:String,
        password: String,
        password_hash:String,
<<<<<<< HEAD
        name:String,
=======
>>>>>>> 2483e50dc7cb9aefde17381336324d4ab4ac7d61
        mail:String,
        telephone:Number,
        role: {type : String, enum:["admin","user"],default : "user"},
        rib:{type:String}
    }
);
const User=mongoose.model("User",usersShema)
export default User

