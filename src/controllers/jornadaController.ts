import { type Request, type Response } from 'express';
import * as jornadaService from '../services/jornadaService.js';
import { CrearJornadaBody, JornadaDetalles } from '../types/jornada.types.js';

type CrearJornadaLocals = {
  body: CrearJornadaBody;
};

type JornadaResponse = {
  msj: string;
  jornadaConDetalle: JornadaDetalles;
};

type ErrorResponse = {
  error: string;
};

export async function obtenerJornadaActual(
  req: Request,
  res: Response<JornadaResponse | ErrorResponse>
) {
  try {
    const jornadaConDetalle = await jornadaService.obtenerJornadaActual();
    res.status(200).json({
      msj: 'Se encontro la jornada',
      jornadaConDetalle,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error no encontrado';
    res.status(500).json({
      error: message,
    });
  }
}

export async function crearJornada(
  req: Request,
  res: Response<JornadaResponse | ErrorResponse, CrearJornadaLocals>
) {
  try {
    const jornadaConDetalle = await jornadaService.crearJornada(
      res.locals.body
    );

    res.status(201).json({
      msj: 'Jornada creada exitosamente',
      jornadaConDetalle,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error no encontrado';
    res.status(500).json({
      error: message,
    });
  }
}
