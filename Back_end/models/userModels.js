import mongoose from 'mongoose';
const usersShema=new mongoose.Schema(
    {
        cin:String,
        password: String,
        role: {type : String, enum:["admin","user"],default : "user"}
    }
);
const User=mongoose.model("User",usersShema)
export default User

