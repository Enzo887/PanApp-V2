import { type Request, type Response } from "express";
import * as productoService from '../services/productoService.js'
import { ProductoBody, Producto } from '../types/index.js'

interface CrearProductoResponse {
    msj: string;
    producto: Producto;
}

export async function obtenerProductos(
    req: Request,
    res: Response<{productos: Producto[]} | {error: string}>) {
    try {
        const productos = await productoService.obtenerProductos()
        res.json({
            productos: productos
        })    
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        res.status(500).json({
            error: message
        })
    }
}

export async function crearProducto(
    req: Request,
    res: Response< CrearProductoResponse | { error: string }>) {
    try {
        
        const productoCreado = await productoService.crearProducto(res.locals.body as ProductoBody)

        res.status(200).json({
            msj: 'Se creo correctamente el producto',
            producto: productoCreado

        })
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        res.status(500).json({  
            error: message
        })
    }
}

export async function actualizarProducto(
    req: Request<{id: string}, {}, ProductoBody>, 
    res: Response<ProductoBody | {error: string}>) {
    try {
        
        const {id} = req.params
        const productoEditado = await productoService.actualizarProducto(id, req.body)

        // res.status(200).json({
        //     producto: productoEditado
        // })
        
    } catch (err) {
        const message= err instanceof Error ? err.message : 'Error no encontrado'
        res.status(500).json({
            error: message
        })
    }
}