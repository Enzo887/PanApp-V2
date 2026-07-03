import { type Request, type Response } from 'express';

export async function mostrarCuenta(req: Request, res: Response) {
  res.json('Estas viendo la seccion CUENTA');
}

export async function obtenerCuenta(
  req: Request<{ id: number }>,
  res: Response
) {
  const { id } = req.params;
  res.json(`Estas viendo la cuenta de id: ${id}`);
}
