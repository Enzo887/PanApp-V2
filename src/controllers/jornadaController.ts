import { type Request, type Response } from 'express';
import * as jornadaService from '../services/jornadaService.js'
import { CrearJornadaBody, JornadaDetalles } from '../types/common.js';

type JornadaResponse = {
  body: CrearJornadaBody
}

export async function obtenerCuenta(
  req: Request,
  res: Response
) {
  const { id } = req.params;
  res.json(`Estas viendo la cuenta de id: ${id}`);
}

export async function crearJornada(
  req: Request,
  res: Response<{msj:string, jornadaConDetalle: JornadaDetalles} | {error:string}, JornadaResponse>) {
  try {

    const jornadaConDetalle = await jornadaService.crearJornada(res.locals.body)

    res.status(201).json({
      msj: "Jornada creada exitosamente",
      jornadaConDetalle
    })
      
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error no encontrado'
    res.status(500).json({
      error: message
    }) 
  }
}
