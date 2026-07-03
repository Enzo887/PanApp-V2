import { Router } from  'express';
export const productoRouter = Router();
import * as productoController from '../controllers/productoController.js'

productoRouter.get('/', productoController.obtenerProductos);
productoRouter.get('/:id', productoController.obtenerProducto);

productoRouter.post('/crear', productoController.crearProducto);
// productoRouter.patch('/editar/:id', );
// productoRouter.delete('/eliminar/:id', );