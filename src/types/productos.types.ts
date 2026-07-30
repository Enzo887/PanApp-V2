//es para usarlo en zod
export const MEDICIONES = ['kg', 'unidad'] as const;
import {z} from 'zod'
import { actualizar, crear } from '../schemas/productoSchema.js';

export type medicion = (typeof MEDICIONES)[number];

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  tipo_medicion: medicion;
  activo: boolean;
}
// export type CrearProductoBody = Omit<Producto, 'id' | 'activo'>;
// export type ActualizarProductoBody = Partial<Omit<Producto, 'id'>>;

export type CrearProductoBody = z.infer<typeof crear>
export type ActualizarProductoBody = z.infer<typeof actualizar>