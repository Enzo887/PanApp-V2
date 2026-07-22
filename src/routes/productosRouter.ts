import { Router } from  'express';
export const productoRouter = Router();
import * as productoController from '../controllers/productoController.js'
import { validar } from '../middlewares/validar.js';
import * as productoSchema from '../schemas/productoSchema.js'

productoRouter.get('/',productoController.obtenerProductos);
productoRouter.post('/crear', validar(productoSchema.crear, 'body'), productoController.crearProducto);
productoRouter.patch('/editar/:id',
    validar(productoSchema.obtener, 'params'),
    validar(productoSchema.actualizar, 'body'), productoController.actualizarProducto);
productoRouter.delete('/eliminar/:id', validar(productoSchema.obtener, 'params'), productoController.eliminarProducto);