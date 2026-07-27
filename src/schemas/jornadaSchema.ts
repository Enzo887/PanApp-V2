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
});

export const editar = z.object({
  fecha: z.iso.date().optional(),
  estado: z.enum(ESTADOS).optional(),
  detalles: z.array(editarDetallesJornada).min(1).optional(),
});
