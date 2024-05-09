import mongoose from 'mongoose';

const PublicacionSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    avatarUrl:{
        type: String,
        default: 'none'
    },
});

export default mongoose.model('Publicacion', PublicacionSchema);
