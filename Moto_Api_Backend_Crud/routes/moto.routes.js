import { Router } from 'express';
import {
    getAllMotos,
    getMotoById,
    postMoto,
    putMoto,
    deleteMoto
} from '../controllers/moto.controller.js';

const moto = Router();

moto.get('/', getAllMotos);
moto.get('/:id', getMotoById);
moto.post('/', postMoto);
moto.put('/:id', putMoto);
moto.delete('/:id', deleteMoto);

export default moto;
