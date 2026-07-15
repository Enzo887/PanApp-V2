import { z } from 'zod'
import { MEDICIONES } from '../types/index.js'

export const crear = z.object({
    nombre: z.string(), 
    precio: z.coerce.number().min(0),
    tipo_medicion: z.enum(MEDICIONES)
})

export const obtener = z.object({
    id: z.coerce.number().positive()
})

export const actualizar = z.object({
    nombre: z.string(), 
    precio: z.coerce.number().min(0),
    tipo_medicion: z.enum(MEDICIONES),
    activo: z.boolean
})
