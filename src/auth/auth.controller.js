import bcryptjs from 'bcryptjs'
import Usuario from '../users/user.model.js'
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    const { usuario, password } = req.body;

    try {

        const user = await Usuario.findOne({ $or: [{ correo: usuario }, { username: usuario }] });

        if (!user) {
            return res.status(400).json({
                msg: "Las credenciales son incorrectas, el correo electrónico o el nombre de usuario no existen en la base de datos",
            });
        }

        if (!user.estado) {
            return res.status(400).json({
                msg: "El usuario no existe en la base de datos",
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta",
            });
        }

        const token = await generarJWT(user.id);

        res.status(200).json({
            msg: "¡Inicio de sesión exitoso!",
            usuario: user,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Contacta al administrador"
        });
    }
}