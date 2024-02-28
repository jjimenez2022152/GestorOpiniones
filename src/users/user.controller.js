import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const usuariosGet = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
}

export const usuariosPost = async (req, res) => {
    const { username, email, password } = req.body;
    const usuario = new User({ username, email, password });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.status(200).json({
        usuario
    });
}

export const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    const usuario = await User.findOne({ _id: id });

    res.status(200).json({
        usuario
    })
}


export const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, username, email, newPassword, ...resto } = req.body; // Cambia newEmail por newPassword

    try {
        const usuario = await User.findById(id);
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado.' });
        }

        if (usuario.email !== email) {
            return res.status(400).json({ msg: 'El email actual no coincide con el registrado.' });
        }

        if (!password) {
            return res.status(400).json({ msg: 'La contraseña actual es obligatoria para cambiarla.' });
        }

        // Verificar si la contraseña actual coincide
        const isPasswordCorrect = await bcryptjs.compare(password, usuario.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: 'La contraseña actual es incorrecta.' });
        }

        // Generar el hash de la nueva contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(newPassword, salt);

        await User.findByIdAndUpdate(id, resto, { new: true });

        res.status(200).json({
            msg: 'Usuario actualizado con éxito',
            id,
            username,
            newPassword // Devuelve newPassword en la respuesta
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el usuario'
        });
    }
};