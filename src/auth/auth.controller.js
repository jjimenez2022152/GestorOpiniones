import bcryptjs from 'bcryptjs';
import User from '../users/user.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';
import { validationResult } from 'express-validator';

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { usuario, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ email: usuario }, { username: usuario }] });

        if (!user) {
            return res.status(400).json({
                msg: "The credentials are incorrect, the email or username do not exist in the database.",
            });
        }

        if (!user.estado) {
            return res.status(400).json({
                msg: "The user does not exist in the database.",
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "The password is incorrect",
            });
        }

        const token = await generarJWT(user._id);

        res.status(200).json({
            msg: "¡Successful login, Welcome!",
            usuario: user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Contacta with the support admin"
        });
    }
};
