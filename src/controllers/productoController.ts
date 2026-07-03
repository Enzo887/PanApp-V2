import { type Request, type Response } from "express";
import * as productoService from '../services/productoService.js'
import { CrearProducto, Producto } from '../types/index.js'

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

export async function crearProducto(
    req: Request<{}, {msj: string}, CrearProducto>,
    res: Response< {msj: string} | { error: string } | { producto: Producto } >) {
    try {
        const {nombre, precioUnitario} = req.body
        console.log(nombre, precioUnitario)
        
        const productoCreado = await productoService.crearProducto({nombre, precioUnitario})

        res.status(200).json({
            msj: 'Se creo correctamente el producto',
            producto: productoCreado

        })
    } catch (err: any) {
        console.log(err.message)
        res.status(404).json({
            error: err.message
        })
    }
}