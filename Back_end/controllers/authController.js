import User from '../models/userModels.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const login = async (req, res) => {
    console.log("abdessmad lhma9")

    try {
        console.log(req.body)

        const { cin, password } = req.body;
        const user = await User.findOne({ cin });
        console.log(user)

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return   res.status(400).json({ success: false, error: "Wrong password" });
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: "10d" }
        );

        res.status(200).json({
            success: true,
            token,
            user: { _id: user._id, name: user.name, role: user.role }
        });
    } catch (error) {
       return res.status(500).json({ success: false, error: error.message })
    }
};

export { login };
