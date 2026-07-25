import { type Request, type Response } from 'express';
import * as productoService from '../services/productoService.js';
import {
  Producto,
  CrearProductoBody,
  ActualizarProductoBody,
} from '../types/productos.types.js';

type ProductoResponse = {
  msj: string;
  producto: Producto;
};

type ErrorResponse = {
  error: string;
};

type CrearProductoLocals = {
  body: CrearProductoBody;
};

type ActualizarProductoLocals = {
  params: { id: number };
  body: ActualizarProductoBody;
};

type EliminarProductoLocals = {
  params: { id: number };
};

export async function obtenerProductos(
  req: Request,
  res: Response<{ productos: Producto[] } | { error: string }>
) {
  try {
    const productos = await productoService.obtenerProductos();
    res.json({
      productos: productos,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({
      error: message,
    });
  }
}

export async function crearProducto(
  req: Request,
  res: Response<ProductoResponse | ErrorResponse, CrearProductoLocals>
) {
  try {
    const productoCreado = await productoService.crearProducto(res.locals.body);

    res.status(201).json({
      msj: 'Se creo correctamente el producto',
      producto: productoCreado,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.status(500).json({
      error: message,
    });
  }
}

export async function actualizarProducto(
  req: Request,
  res: Response<ProductoResponse | ErrorResponse, ActualizarProductoLocals>
) {
  try {
    const { id } = res.locals.params;
    const productoEditado = await productoService.actualizarProducto(
      id,
      res.locals.body
    );

    res.status(200).json({
      msj: 'Se edito correctamente el producto',
      producto: productoEditado,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error no encontrado';
    res.status(404).json({
      error: message,
    });
  }
}

export async function eliminarProducto(
  req: Request,
  res: Response<{ msj: string } | ErrorResponse, EliminarProductoLocals>
) {
  try {
    const { id } = res.locals.params;
    await productoService.eliminarProducto(id);
    res.status(204).json({
      msj: 'Producto eliminado correctamente',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error no encontrado';
    res.status(404).json({
      error: message,
    });
  }
}
