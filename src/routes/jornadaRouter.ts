import { Router } from 'express';
import * as jornadaController from '../controllers/jornadaController.js';
export const jornadaRouter = Router();
import { validar } from '../middlewares/validar.js';
import * as jornadaSchema from '../schemas/jornadaSchema.js';

jornadaRouter.get('/', jornadaController.obtenerJornadaActual);

jornadaRouter.post(
  '/crear',
  validar(jornadaSchema.crear, 'body'),
  jornadaController.crearJornada
);

jornadaRouter.patch(
  '/editar/:id',
  validar(jornadaSchema.id, 'params'),
  validar(jornadaSchema.editar, 'body'),
  jornadaController.actualizarJornada
);
