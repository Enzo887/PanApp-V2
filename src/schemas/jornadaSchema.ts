import { z } from 'zod';
import { ESTADOS } from '../types/jornada.types.js';

const crearDetallesJornada = z.object({
  producto_id: z.number().int().positive(),
  cantidad_ingreso: z.number().nonnegative(),
  cantidad_egreso: z.number().nonnegative(),
});

export const crear = z.object({
  fecha: z.iso.date(),
  detalles: z.array(crearDetallesJornada).min(1),
});

export const id = z.object({
  id: z.coerce.number(),
});

export const editarDetallesJornada = z.object({
  id: z.number().int().positive(),
  cantidad_ingreso: z.number().nonnegative().optional(),
  cantidad_egreso: z.number().nonnegative().optional(),
  producto_id: z.number().int().positive().optional(),
}).refine(
  (d) => d.cantidad_ingreso !== undefined || d.cantidad_egreso !== undefined || d.producto_id !== undefined,
  { message: "Cada detalle debe traer al menos un campo a modificar además del id" }
);

export const editar = z.object({
  fecha: z.iso.date().optional(),
  estado: z.enum(ESTADOS).optional(),
  detalles: z.array(editarDetallesJornada).min(1).optional(),
}).refine(
  (data) => data.fecha !== undefined || data.estado !== undefined || data.detalles !== undefined,
  { message: "Debe enviar al menos un campo para actualizar" }
);
