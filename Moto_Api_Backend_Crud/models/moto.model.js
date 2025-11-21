import mongoose from "mongoose";

const motoSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    año: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    kilometraje: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    imagen: {
        type: String, 
        required: false
    }
});

const Moto = mongoose.model('Moto', motoSchema);

export default Moto;
