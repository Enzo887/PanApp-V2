import { CrearProducto, Producto } from '../types/index.js'

//SIMULANDO LA BD xq no tengo conexion 
    let productos: Producto[]

    // productos = [
    //     {
    //         id: 1,
    //         nombre: "Pan",
    //         precioUnitario: 2800,
    //     },
    //     {
    //         id: 2,
    //         nombre: "Cuadradita",
    //         precioUnitario: 3000
    //     },
    //     {
    //         id: 3,
    //         nombre: "Factura",
    //         precioUnitario: 700
    //     },
    // ]
    productos= []

export async function obtenerProductos() {
    return productos
}

export async function obtenerProducto(id:number) {

    const productoEncontrado = productos.find( p => p.id === id);
    if(!productoEncontrado){
        console.log("[R] No se encontro ningun producto en BD")
        throw new Error(`No se encontro ningun producto en BD con id: ${id}`) //Creo que este hay que ponerlo si o si asi en mi controller agarremel error y lo muestra en el front
    }
    console.log("Producto: ", productoEncontrado)

    return productoEncontrado
}

export async function crearProducto(producto: CrearProducto) {
    
    const pAsignacion = {
        id: 4,
        ...producto,
    }
        console.log(`[R] Producto Creado: ${pAsignacion.id}, ${pAsignacion.nombre}, ${pAsignacion   .precioUnitario}`)

    productos.push(pAsignacion)

    return pAsignacion;
    
}