import { ProductoBody, Producto } from '../types/index.js'
import { supabase } from './db/supabase.js';


export async function crearProducto(producto: ProductoBody) {

    const {data, error} = await supabase
        .from('producto')
        .insert({
            nombre: producto.nombre,
            precio: producto.precio,
            tipo_medicion: producto.tipo_medicion
        })
        //para ver que se creó bien
        // .select()
        // .single()

    if(error){
        throw new Error(error.message)
    }
    // console.log(`[R] Producto Creado: ${pAsignacion.id}, ${pAsignacion.nombre}, ${pAsignacion.precio}`)
    console.log(data)
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

export async function actualizarProducto(id:string, producto: ProductoBody) {
    const ID = Number(id)

    //Busco por id, retorno tipo ProductoBody, el id no.

    return producto
}