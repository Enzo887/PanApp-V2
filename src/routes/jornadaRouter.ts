import { Router } from 'express';
import * as jornadaController from '../controllers/jornadaController.js';
export const jornadaRouter = Router();
import { validar } from '../middlewares/validar.js';
import * as jornadaSchema from '../schemas/jornadaSchema.js';

jornadaRouter.get('/', jornadaController.obtenerJornadaActual);

jornadaRouter.post(
  '/crear',
  validar(jornadaSchema.crearJornada, 'body'),
  jornadaController.crearJornada
);
