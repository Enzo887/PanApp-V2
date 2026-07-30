import {
  ActualizarDetalle,
  ActualizarJornada,
  Jornada,
  NuevaJornada,
  NuevoDetalle,
} from '../types/jornada.types.js';
import { supabase } from './db/supabase.js';
import type { Json } from '../types/database.types.js'

export async function crearJornada(
  jornada: NuevaJornada
): Promise<Jornada> {
  const { data, error } = await supabase
    .from('jornada')
    .insert({
      fecha: jornada.fecha,
    })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error(`Ya existe una jornada con esa fecha`);
    }
    throw new Error(error.message);
  }

  return data;
}

export async function crearDetallesJornada(detallesJornada: NuevoDetalle[]) {
  const { data, error } = await supabase
    .from('detalle_jornada')
    .insert(detallesJornada)
    .select('*, producto:producto(*)');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function obtenerJornadaActual() {
  const { data, error } = await supabase
    .from('jornada')
    .select('*')
    .eq('estado', 'abierta')
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function obtenerDetallesDeJornada(idJornada: number) {
  const { data, error } = await supabase
    .from('detalle_jornada')
    .select('*, producto:producto(*)')
    .eq('jornada_id', idJornada);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

  export async function actualizarJornada(id: number,jornada: ActualizarJornada) {
    const {data, error} = await supabase
    .from('jornada')
    .update(jornada)
    .eq('id', id)
    .select()
    .single()
    
  if (error) {
    if (error.code === '23505') {
      throw new Error(`Ya existe una jornada abierta`);
    }
    throw new Error(error.message);
  }

    return data
  }

export async function actualizarDetalles(detalles: ActualizarDetalle[]) {
  const { data, error } = await supabase.rpc('actualizar_detalles_jornada', {
    cambios: detalles as unknown as Json,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}