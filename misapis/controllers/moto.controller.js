import Moto from "../models/moto.model.js";
import mongoose from "mongoose";

export const getAllMotos = async (req, res) => {
    try {
        const motos = await Moto.find({}, { __v: 0 });
        if (motos.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron motos'
            });
        }
        return res.status(200).json({ motos });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener las motos'
        });
    }
};

export const getMotoById = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no válido' });
        }
        const moto = await Moto.findById(id);
        if (!moto) {
            return res.status(404).json({ msg: 'Moto no encontrada' });
        }
        return res.status(200).json({ moto });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al obtener la moto' });
    }
};

export const postMoto = async (req, res) => {
    const body = req.body;
    const moto = new Moto(body);
    try {
        const validationError = moto.validateSync();
        if (validationError) {
            const errorMessages = Object.values(validationError.errors).map(error => error.message);
            return res.status(500).json({
                msg: errorMessages
            });
        }

        await moto.save();
        return res.status(201).json({ moto });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al guardar la moto' });
    }
};

export const putMoto = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no válido' });
        }

        const moto = await Moto.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!moto) {
            return res.status(404).json({ msg: 'Moto no encontrada' });
        }

        return res.status(200).json({ moto });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al actualizar la moto' });
    }
};

export const deleteMoto = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no válido' });
        }

        const moto = await Moto.findByIdAndDelete(id);
        if (!moto) {
            return res.status(404).json({ msg: 'Moto no encontrada' });
        }

        return res.status(200).json({ msg: 'Moto eliminada', moto });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al eliminar la moto' });
    }
};

