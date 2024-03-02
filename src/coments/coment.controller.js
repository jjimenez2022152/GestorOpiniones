import Comentario from './coment.model.js';
import User from '../users/user.model.js'; 

export const agregarComentario = async (req, res) => {
    const user = req.usuario; 
    const { comentario, publicacionId } = req.body;

    try {
        // Crear el comentario
        const nuevoComentario = new Comentario({
            comentario, // Cambiado de 'texto' a 'comentario'
            usuario: user._id,
            publicacion: publicacionId
        });

        // Guardar el comentario en la base de datos
        await nuevoComentario.save();

        // Obtener el usuario para obtener su correo
        const usuario = await User.findById(user._id);

        res.status(201).json({
            msg: 'Comentario agregado exitosamente',
            comentario: {
                ...nuevoComentario.toObject(),
                usuario: {
                    id: usuario._id,
                    email: usuario.email
                }
            }
        });
    } catch (error) {
        console.error('Error al agregar comentario:', error);
        res.status(500).json({ error: 'Error al agregar comentario' });
    }
};
