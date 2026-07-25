//es para usarlo en zod
export const MEDICIONES = ['kg', 'unidad'] as const;

export type medicion = (typeof MEDICIONES)[number];

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  tipo_medicion: medicion;
  activo: boolean;
}
export type CrearProductoBody = Omit<Producto, 'id' | 'activo'>;
export type ActualizarProductoBody = Partial<Omit<Producto, 'id'>>;

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

export interface Jornada {
  id: number;
  estado: 'abierta' | 'cerrada';
  fecha: string;
}

export type CrearJornadaBody = Omit<Jornada, 'id' | 'estado'> & {
  detalles: CrearDetallesBody[];
};

export type JornadaDetalles = Jornada & {
  detalles: ObtenerDetalleCompleto[];
};
