import { Jornada, CrearJornadaBody, DetalleCompleto } from "../types/common.js";
import { supabase } from "./db/supabase.js";

export async function crearJornada(jornada: CrearJornadaBody): Promise<Jornada> {
    const {data, error} = await supabase
    .from('jornada')
    .insert({
        fecha: jornada.fecha
    })
    .select()
    .single()

    if(error){
        throw new Error(error.message)
    }

    return data
}

export async function crearDetallesJornada(detallesJornada: DetalleCompleto[]) {
    const {data, error} = await supabase
    .from('detalle_jornada')
    .insert(detallesJornada)
    .select()

    if(error){
        throw new Error(error.message)
    }

    return data
}

export async function buscarPreciosPorIds(ids: number[]) {
    const { data, error } = await supabase
        .from('producto')
        .select('id, precio')
        .in('id', ids)

    if (error) throw new Error(error.message)
    return data
}