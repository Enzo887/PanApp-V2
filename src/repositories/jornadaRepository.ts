import { Jornada, CrearJornadaBody, DetalleCompleto } from '../types/common.js';
import { supabase } from './db/supabase.js';

export async function crearJornada(
  jornada: CrearJornadaBody
): Promise<Jornada> {
  const { data, error } = await supabase
    .from('jornada')
    .insert({
      fecha: jornada.fecha,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function crearDetallesJornada(detallesJornada: DetalleCompleto[]) {
  const { data, error } = await supabase
    .from('detalle_jornada')
    .insert(detallesJornada)
    .select('*, producto:producto(*)');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function obtenerCuentaActual() {
  const { data, error } = await supabase
    .from('jornada')
    .select('*')
    .eq('estado', 'abierta')
    .single();

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
