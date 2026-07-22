//es para usarlo en zod
export const MEDICIONES = ['kg', 'unidad'] as const;

export type medicion = typeof MEDICIONES[number];

export interface Producto{
    id: number,
    nombre: string,
    precio: number,
    tipo_medicion: medicion,
    activo: boolean
}
export type CrearProductoBody = Omit<Producto, 'id' | 'activo'>
export type ActualizarProductoBody = Partial<Omit<Producto, 'id'>>

// export interface Ingreso{
//     // id: number,
//     productoId: number,
//     cantidad: number,
//     fecha: Date
// }



