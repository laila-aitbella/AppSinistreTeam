import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    cin: String,
    password: String,  // ✅ contient le hash bcrypt uniquement
    name: String,
    mail: String,
    telephone: Number,
    role: { type: String, enum: ["admin", "user"], default: "user" },
    rib: { type: String },
    gender: { type: String, enum: ["male", "female", "other"] },
    birthdate: { type: Date }
});

const User = mongoose.model("User", usersSchema);
export default User;
