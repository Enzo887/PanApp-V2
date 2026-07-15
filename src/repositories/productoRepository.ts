import { ProductoBody, Producto } from '../types/index.js'
import { supabase } from './db/supabase.js';


export async function crearProducto(producto: ProductoBody) {
    
    const pAsignacion = {
        id: 4,
        activo:true,
        ...producto,
    }
        console.log(`[R] Producto Creado: ${pAsignacion.id}, ${pAsignacion.nombre}, ${pAsignacion.precioUnitario}`)

    // productos.push(pAsignacion)

    return pAsignacion;
    
}

export async function obtenerProductos() {
    const {data, error} = await supabase
    .from('producto')
    .select('*')

    if(error){
        throw new Error(error.message)
    }
    return data
}

export async function actualizarProducto(id:string, producto: ProductoBody) {
    const ID = Number(id)

    //Busco por id, retorno tipo ProductoBody, el id no.

    return producto
}