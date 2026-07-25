import { z } from 'zod';

const crearDetallesJornada = z.object({
  producto_id: z.number().int().positive(),
  cantidad_ingreso: z.number().nonnegative(),
  cantidad_egreso: z.number().nonnegative(),
});

export const crearJornada = z.object({
  fecha: z.iso.date(),
  detalles: z.array(crearDetallesJornada).min(1),
});

export const obtenerJornada = z.object({
  id: z.coerce.number(),
});
