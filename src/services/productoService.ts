import * as productoRepository from '../repositories/productoRepository.js'
import {ProductoBody} from '../types/index.js'

// export async function obtenerProducto(id: number){
//     return productoRepository.obtenerProducto(Number(id));
// }

export async function crearProducto(producto: ProductoBody) {
    return await productoRepository.crearProducto(producto);
}

export async function obtenerProductos() {
    return await productoRepository.obtenerProductos();
}

export async function actualizarProducto(id:string, producto: ProductoBody) {
    return await productoRepository.actualizarProducto(id, producto)
}