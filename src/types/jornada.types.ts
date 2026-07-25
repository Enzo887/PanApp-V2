import { Producto } from './productos.types.js';

export interface DetallesJornada {
  id: number;
  jornada_id: number;
  producto_id: number;
  cantidad_ingreso: number;
  cantidad_egreso: number;
  precio_unitario: number;
}

export type DetalleCompleto = Omit<DetallesJornada, 'id'>;
export type ObtenerDetalleCompleto = Omit<
  DetallesJornada,
  'id' | 'producto_id'
> & {
  producto: Producto;
};
export type CrearDetallesBody = Omit<
  DetallesJornada,
  'id' | 'jornada_id' | 'precio_unitario'
>;

export const ESTADOS = ['abierta', 'cerrada'] as const;

export type estado = (typeof ESTADOS)[number];

export interface Jornada {
  id: number;
  estado: estado;
  fecha: string;
}

export type CrearJornadaBody = Omit<Jornada, 'id' | 'estado'> & {
  detalles: CrearDetallesBody[];
};

export type JornadaDetalles = Jornada & {
  detalles: ObtenerDetalleCompleto[];
};
