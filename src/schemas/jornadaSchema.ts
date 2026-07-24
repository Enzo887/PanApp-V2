import { z } from 'zod'

const detallesSchema = z.object({
    producto_id: z.number().int().positive(),
    cantidad_ingreso: z.number().nonnegative(),
    cantidad_egreso: z.number().nonnegative()
})

export const jornadaSchema = z.object({
    fecha: z.iso.date(),
    detalles: z.array(detallesSchema).min(1)
})

