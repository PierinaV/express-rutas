import moto from './moto.routes.js';
import { Router } from 'express';

const indexRoutes = Router();

indexRoutes.use('/motos', moto);

export default indexRoutes;
