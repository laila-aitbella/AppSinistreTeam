import mongoose from 'mongoose';

const constateurSchema = new mongoose.Schema({
    constateurId: { type: String, required: true, unique: true },
    name: String,
    telephone: String
});

const Constateur = mongoose.model("Constateur", constateurSchema);
export default Constateur;
