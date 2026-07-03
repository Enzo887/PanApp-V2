import { Router } from 'express';
import * as cuentaController from '../controllers/cuentaController.js';
import { saludar } from '../middlewares/probando.js';
export const cuentaRouter = Router();

cuentaRouter.get('/', cuentaController.mostrarCuenta);
cuentaRouter.get('/obtener/:id', saludar(), cuentaController.obtenerCuenta);
