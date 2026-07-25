import { CrearJornadaBody } from '../types/common.js';
import * as jornadaRepository from '../repositories/jornadaRepository.js';
import { buscarProductosPorIds } from '../repositories/productoRepository.js';

export async function obtenerCuentaActual() {
  const jornadaActual = await jornadaRepository.obtenerCuentaActual();

  const DetallesJornadaActual =
    await jornadaRepository.obtenerDetallesDeJornada(jornadaActual.id);

  const DetallesJornada = DetallesJornadaActual.map((d) => {
    const { producto_id: _omit, ...detalleSinProductoId } = d;

    return {
      ...detalleSinProductoId,
    };
  });

  return {
    ...jornadaActual,
    detalles: DetallesJornada,
  };
}

export async function crearJornada(jornada: CrearJornadaBody) {
  const jornadaCreada = await jornadaRepository.crearJornada(jornada);

  const idsProductos = jornada.detalles.map((d) => d.producto_id);
  const productos = await buscarProductosPorIds(idsProductos);
  const precioPorProducto = new Map(productos.map((p) => [p.id, p.precio]));

  const detallesCompletos = jornada.detalles.map((detalle) => {
    const precio = precioPorProducto.get(detalle.producto_id);
    if (precio === undefined) {
      throw new Error(`Producto ${detalle.producto_id} no existe`);
    }

    return {
      ...detalle,
      jornada_id: jornadaCreada.id,
      precio_unitario: precio,
    };
  });

  const detalles =
    await jornadaRepository.crearDetallesJornada(detallesCompletos);

  const DetallesJornada = detalles.map((d) => {
    const { producto_id: _omit, ...detalleSinProductoId } = d;

    return {
      ...detalleSinProductoId,
    };
  });
  return { ...jornadaCreada, detalles: DetallesJornada };
}
