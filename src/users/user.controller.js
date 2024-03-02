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
    const { password, username, email, newPassword, ...resto } = req.body;

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

        const isPasswordCorrect = await bcryptjs.compare(password, usuario.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: 'La contraseña actual es incorrecta.' });
        }

        if (username) {
            usuario.username = username;
        }

        if (newPassword) {
            const salt = bcryptjs.genSaltSync();
            usuario.password = bcryptjs.hashSync(newPassword, salt);
        }
        
        Object.keys(resto).forEach(key => {
            usuario[key] = resto[key];
        });

        await usuario.save();

        res.status(200).json({
            msg: 'Usuario actualizado con éxito',
            id,
            username: usuario.username,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el usuario'
        });
    }
};