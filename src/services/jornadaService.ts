import { NuevaJornada, Jornada, ActualizarJornadaDetalles, ActualizarJornada, ActualizarDetalle, JornadaDetallesActualizado } from '../types/jornada.types.js';
import * as jornadaRepository from '../repositories/jornadaRepository.js';
import { buscarProductosPorIds } from '../repositories/productoRepository.js';

let jornadaActual: Jornada;

export async function obtenerJornadaActual() {
  jornadaActual = await jornadaRepository.obtenerJornadaActual();

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

export async function crearJornada(jornada: NuevaJornada) {
  if (jornadaActual) {
    throw new Error('Hay una jornada abierta');
  }

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


export async function actualizarJornada(idJornada: number,jornada: ActualizarJornadaDetalles): Promise<JornadaDetallesActualizado> {
  const {detalles, ...camposJornada} = jornada
  let jornadaActualizada: ActualizarJornada | undefined;
  let detallesActualizados: ActualizarDetalle[] | undefined;

  const huboCambiosJornada = camposJornada.estado !== undefined || camposJornada.fecha !== undefined

  if(huboCambiosJornada){
    jornadaActualizada = await jornadaRepository.actualizarJornada(idJornada, camposJornada)
  }

  if (detalles && detalles.length > 0) {
    const detallesConPrecio =  await resolverPreciosDetalles(detalles)
    detallesActualizados = await jornadaRepository.actualizarDetalles(detallesConPrecio);
  }
  return {
  ...jornadaActualizada,
  detalles: detallesActualizados
  }
}

async function resolverPreciosDetalles(detalles: ActualizarDetalle[]): Promise<ActualizarDetalle[]> {
  const idsProductos = detalles
    .filter((d) => d.producto_id !== undefined)
    .map((d) => d.producto_id as number);

  if (idsProductos.length === 0) {
    return detalles;
  }

  const productos = await buscarProductosPorIds(idsProductos);
  const mapaProductos = new Map(productos.map((p) => [p.id, p]));

  return detalles.map((detalle) => {
    if (detalle.producto_id === undefined) {
      return detalle;
    }

    const producto = mapaProductos.get(detalle.producto_id);
    if (!producto) {
      throw new Error(`Producto ${detalle.producto_id} no encontrado`);
    }

    return {
      ...detalle,
      precio_unitario: producto.precio,
    };
  });
}