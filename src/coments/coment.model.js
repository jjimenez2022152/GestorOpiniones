import mongoose from 'mongoose';

const ComentarioSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    comentario: {
        type: String,
        required: true
    },
    publicacion: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
        required: true
    },
    comentarioPadre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comentario',
    },
    estado : {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Comentario', ComentarioSchema);
