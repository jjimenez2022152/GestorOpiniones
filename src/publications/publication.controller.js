//import jwt from 'jsonwebtoken';
import Publication from './publication.model.js';
//import User from '../users/user.model.js';

export const publicationsPost = async (req, res) => {

    const { titulo, categoria, texto, avatarUrl } = req.body;

    try {
        const publication = new Publication({
            titulo,
            categoria,
            texto,
            avatarUrl
        });

        await publication.save();


        res.status(200).json({
            msg: 'Publicación agregada exitosamente',
            publication: {
                ...publication.toObject(),
            }
        });
    } catch (error) {
        console.error('Error al crear la publicación:', error);
        res.status(500).json({ error: 'Error al crear la publicación' });
    }
};

export const publicationsDelete = async (req, res) => {
    const user = req.usuario;
    const publicationId = req.params.id;

    try {
        const publication = await Publication.findById(publicationId);

        if (!publication) {
            return res.status(404).json({ msg: 'La publicación no existe' });
        }

        if (publication.usuario.toString() !== user._id.toString()) {
            return res.status(403).json({ msg: 'No tienes permiso para eliminar esta publicación' });
        }

        await Publication.findByIdAndDelete(publicationId);

        res.status(200).json({ msg: 'Publicación eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la publicación:', error);
        res.status(500).json({ error: 'Error al eliminar la publicación' });
    }
};


export const publicationsGet = async (req, res) => {
    try {
        const publications = await Publication.find();

        res.status(200).json(publications);
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
};



export const publicationsPut = async (req, res) => {
    const user = req.usuario;
    const publicationId = req.params.id;
    const { titulo, categoria, texto } = req.body;

    try {
        const publication = await Publication.findById(publicationId);

        if (!publication) {
            return res.status(404).json({ msg: 'La publicación no existe' });
        }

        if (publication.usuario.toString() !== user._id.toString()) {
            return res.status(403).json({ msg: 'No tienes permiso para editar esta publicación' });
        }

        publication.titulo = titulo;
        publication.categoria = categoria;
        publication.texto = texto;

        await publication.save();

        res.status(200).json({ msg: 'Publicación actualizada exitosamente', publication });
    } catch (error) {
        console.error('Error al actualizar la publicación:', error);
        res.status(500).json({ error: 'Error al actualizar la publicación' });
    }
};
