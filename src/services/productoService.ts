import * as productoRepository from '../repositories/productoRepository.js'
import { CrearProducto} from '../types/index.js'

export async function obtenerProducto(id: number){
    return productoRepository.obtenerProducto(Number(id));
}

export async function crearProducto(producto: CrearProducto) {
    //debo validar el producto aca o en un middleware?

    return await productoRepository.crearProducto(producto);
}