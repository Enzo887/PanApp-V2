import { Router } from  'express';
export const productoRouter = Router();
import * as productoController from '../controllers/productoController.js'

productoRouter.get('/', productoController.cargarPantalla); // en caso de SSR
productoRouter.get('/obtener/:id', productoController.obtenerProducto);
productoRouter.get('/obtener/todos', productoController.obtenerProducto);

productoRouter.post('/crear', productoController.crearProducto);
// productoRouter.patch('/editar/:id', );
// productoRouter.delete('/eliminar/:id', );