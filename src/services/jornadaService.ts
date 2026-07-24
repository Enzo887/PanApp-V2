import { CrearJornadaBody } from "../types/common.js";
import * as jornadaRepository from '../repositories/jornadaRepository.js'

export async function obtenerCuenta(id:number){    
}

export async function crearJornada(jornada: CrearJornadaBody) {
    const jornadaCreada = await jornadaRepository.crearJornada(jornada)
// console.log(jornadaCreada)
    const idsProductos = jornada.detalles.map(d => d.producto_id)
    console.log("idsProductos: ",idsProductos)
    const productos = await jornadaRepository.buscarPreciosPorIds(idsProductos)
    console.log("productos: ",productos)
    const precioPorProducto = new Map(productos.map(p => [p.id, p.precio]))
    console.log("precioPorProducto: ",precioPorProducto)

    const detallesCompletos = jornada.detalles.map(detalle => {
        const precio = precioPorProducto.get(detalle.producto_id)
        if(precio === undefined){
            throw new Error(`Producto ${detalle.producto_id} no existe`)
        }

        return {...detalle, jornada_id:jornadaCreada.id, precio_unitario: precio}
    })
    console.log(detallesCompletos)

    const detalles = await jornadaRepository.crearDetallesJornada(detallesCompletos)
console.log(detalles)
    return{...jornadaCreada, detalles}
}