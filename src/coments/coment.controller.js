import Comment from './coment.model.js';
import Publication from '../publications/publication.model.js'

export const agregarComentario = async (req, res) => {
    const { comentario, idPublicacion, comentarioPadre } = req.body;

    try {
        const publication = await Publication.findById(idPublicacion);

        if (!publication) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }

        const comment = new Comment({
            comentario,
            publicacion: idPublicacion,
            ...(comentarioPadre ? {comentarioPadre} : {})
        });

        await comment.save();


        res.status(201).json({
            msg: 'Comentario agregado correctamente',
            comment: {
                ...comment.toObject(),
                tituloPublicacion: publication.titulo,
            }
        });

    } catch (error) {
        console.error('Error, cannot add comment', error);
        res.status(500).json({ error: 'Error, cannor add comment' });
    }

};

export const getComments = async (req, res) => {
    try {
        const comment = await Comment.find({estado : true});
        
        res.status(200).json(comment);
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ error: 'Error al obtener los comentarios' });
    }
};

export const commentPut = async (req, res) => {
    const user = req.usuario;
    const commentId = req.params.id;
    const { comentario } = req.body;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ msg: 'El comentario no existe' });
        }

        if (comment.usuario.toString() !== user._id.toString()) {
            return res.status(403).json({ msg: 'No tienes acceso para editar este comentario' });
        }

        comment.comentario = comentario;

        await comment.save();

        res.status(200).json({ msg: 'Comentario actualizado correctamente', comment });
    } catch (error) {
        console.error('Error al actualizar comentario:', error);
        res.status(500).json({ error: 'Error al actualizar comentario' });
    }
};

export const commentDelete = async (req, res) => {
    const user = req.usuario;
    const commentId = req.params.id;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ msg: 'El comentario no existe' });
        }

        if (comment.usuario.toString() !== user._id.toString()) {
            return res.status(403).json({ msg: 'No tienes acceso para eliminar este comentario' });
        }

        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({ msg: 'Comentario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar comentario:', error);
        res.status(500).json({ error: 'Error al eliminar comentario' });
    }
};