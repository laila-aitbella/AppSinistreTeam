import mongoose from 'mongoose';
const usersShema=new mongoose.Schema(
    {
        cin:String,
        password: String,
        password_hash:String,
        name:String,
        mail:String,
        telephone:Number,
        role: {type : String, enum:["admin","user"],default : "user"},
        rib:{type:String}
    }
);
const User=mongoose.model("User",usersShema)
export default User

