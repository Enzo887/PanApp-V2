import { Router } from 'express';
import * as cuentaController from '../controllers/cuentaController.js'

export const cuentaRouter = Router();

cuentaRouter.get('/', cuentaController.mostrarCuenta)
cuentaRouter.get('/obtener/:id', cuentaController.obtenerCuenta)