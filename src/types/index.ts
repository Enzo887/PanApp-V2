type tipoUnidad = {
    // peso: string,
    // unidad:string
}

export interface Producto{
    id: number,
    nombre: string,
    precioUnitario: number
    // ,
    // unidad: tipoUnidad
}

export type CrearProducto = Omit<Producto, 'id'>

// export interface Ingreso{
//     // id: number,
//     productoId: number,
//     cantidad: number,
//     fecha: Date
// }



