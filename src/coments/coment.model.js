import mongoose from 'mongoose';

const ComentarioSchema = mongoose.Schema({
    comentario: {
        type: String,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    publicacion: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
        required: true
    }
});

export default mongoose.model('Comentario', ComentarioSchema);
