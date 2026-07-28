import { type Request, type Response } from 'express';
import * as jornadaService from '../services/jornadaService.js';
import { NuevaJornada, JornadaDetallesCreado, ActualizarJornada, JornadaDetallesActualizado } from '../types/jornada.types.js';

type CrearJornadaLocals = {
  body: NuevaJornada;
};

type ActualizarJornadaLocals = {
  params: {id: number}
  body: ActualizarJornada;
};

type JornadaResponse = {
  msj: string;
  jornadaConDetalle: JornadaDetallesCreado;
};

type JornadaResponseActualizar = {
  msj: string;
  jornadaConDetalle: JornadaDetallesActualizado;
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

export async function actualizarJornada(
  req: Request, 
  res: Response<JornadaResponseActualizar | ErrorResponse, ActualizarJornadaLocals>
) {
  try {

    const {id} = res.locals.params

    const jornadaActualizada = await jornadaService.actualizarJornada(id,res.locals.body)
    res.status(200).json({
      msj: 'Se edito correctamente',
      jornadaConDetalle: jornadaActualizada
    })
    
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error no encontrado'
    res.status(500).json({
      error: message
    })
  }
}
