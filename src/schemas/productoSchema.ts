import { z } from 'zod';
import { MEDICIONES } from '../types/productos.types.js';

const productoBaseSchema = z.object({
  nombre: z.string(),
  precio: z.coerce.number().min(0, 'El precio debe ser mayor a cero'),
  tipo_medicion: z.enum(MEDICIONES),
  activo: z.boolean(),
});

export const crear = productoBaseSchema.omit({ activo: true }).strict();

export const obtener = z.object({
  id: z.coerce.number().positive(),
});

export const actualizar = productoBaseSchema.partial().strict();
