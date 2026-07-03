import { type Request, type Response } from "express";
import * as productoService from '../services/productoService.js'
import { CrearProducto, Producto } from '../types/index.js'

interface CrearProductoResponse {
    msj: string;
    producto: Producto;
}

export async function cargarPantalla(req: Request, res: Response){
    res.status(200).json("estas viendo la pantalla de productos");
}

export async function obtenerProducto(req: Request<{id: number}>, res: Response){
    try {
        const { id } = req.params;
        //llamar al productoService
        const producto = await productoService.obtenerProducto(id);
        
        //retornar si hay productos o no
        // if(!producto){
        //     res.json({
        //         error: `No hay producto con el id ${id}`
        //     })        
        // } creo que esto es innecesario xq si no existe y hago un throw error iria al catch y de ahi me manejo en el front

        res.status(200).json({
            data: producto
        })
        
    } catch (err: any) {
        // console.error("[C] Error al obtener el producto");
        res.status(500).json({
            error: err.message
        })
    }
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
    req: Request<{},{}, CrearProducto>,
    res: Response< CrearProductoResponse | { error: string }>) {
    try {
        
        const productoCreado = await productoService.crearProducto(req.body)

        res.status(200).json({
            msj: 'Se creo correctamente el producto',
            producto: productoCreado

        })
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        console.log(message)
        res.status(500).json({  
            error: message
        })
    }
}