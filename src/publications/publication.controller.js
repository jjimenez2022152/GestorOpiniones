import jwt from 'jsonwebtoken';
import Publication from '../models/Publication';
import User from '../models/User';

export const crearPublicacion = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        const user = await User.findById(userId); 

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado.' });
        }

        const { titulo, categoria, texto } = req.body;
        const nuevaPublicacion = new Publication({
            titulo,
            categoria,
            texto,
            usuario: userId
        });

        await nuevaPublicacion.save(); 

        res.status(201).json({ msg: 'Publicación creada exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al crear la publicación.' });
    }
};
