import { Router } from 'express';
import * as jornadaController from '../controllers/jornadaController.js';
export const jornadaRouter = Router();
import { validar } from '../middlewares/validar.js';
import { jornadaSchema } from '../schemas/jornadaSchema.js'

jornadaRouter.get('/obtener/:id', jornadaController.obtenerCuenta);

jornadaRouter.post('/crear',validar(jornadaSchema, "body"), jornadaController.crearJornada)