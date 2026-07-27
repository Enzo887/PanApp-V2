import { Producto } from './productos.types.js';
import {z} from 'zod'
import { editar, editarDetallesJornada } from '../schemas/jornadaSchema.js';

export interface Detalles {
  id: number;
  jornada_id: number;
  producto_id: number;
  cantidad_ingreso: number;
  cantidad_egreso: number;
  precio_unitario: number;
}

export type CrearDetalles = Omit<
  Detalles,
  'id' | 'jornada_id' | 'precio_unitario'
>;

//Repository
export type NuevoDetalle = Omit<Detalles, 'id'>;

//saco producto_id porque mando a producto como objeto con sus datos
export type DetalleCreado = Omit<
  Detalles,
  'producto_id'
> & {
  producto: Producto;
};


export const ESTADOS = ['abierta', 'cerrada'] as const;

export type estado = (typeof ESTADOS)[number];

export interface Jornada {
  id: number;
  estado: estado;
  fecha: string;
}

export type NuevaJornada = Omit<Jornada, 'id' | 'estado'> & {
  detalles: CrearDetalles[];
};

export type JornadaDetallesCreado = Jornada & {
  detalles: DetalleCreado[];
};

export type EditarJornadaBody = z.infer<typeof editar>;
export type EditarDetalleJornadaBody = z.infer<typeof editarDetallesJornada>;