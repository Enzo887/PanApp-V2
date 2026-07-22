import { CrearProductoBody, ActualizarProductoBody } from '../types/index.js'
import { supabase } from './db/supabase.js';


export async function crearProducto(producto: CrearProductoBody) {

    const {data, error} = await supabase
        .from('producto')
        .insert({
            nombre: producto.nombre,
            precio: producto.precio,
            tipo_medicion: producto.tipo_medicion
        })

    if(error){
        if(error.code === '23505'){
            throw new Error(`Ya existe un producto con el nombre '${producto.nombre}'`)
        }
        throw new Error(error.message)
    }
    return data;    
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

export async function actualizarProducto(id:number, producto: ActualizarProductoBody) {

    const {data, error} = await supabase
        .from('producto')
        .update({
            nombre: producto.nombre,
            precio: producto.precio,
            tipo_medicion: producto.tipo_medicion,
            activo: producto.activo
        })
        .eq("id", id)

        if(error){
            if(error.code === '23505'){
                throw new Error(`Ya existe un producto con el nombre '${producto.nombre}'`)
            }
            throw new Error(error.message)
        }

    return data
}