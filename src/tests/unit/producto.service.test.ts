import { describe, it, expect, jest } from "@jest/globals";
import * as productoRepository from "../../repositories/productoRepository.js";
import * as productoService from "../../services/productoService.js";

describe("ProductoService", () => {
  it("debería crear un producto", async () => {
    jest.spyOn(productoRepository, "crearProducto")
    .mockResolvedValue({
        id: 1,
        nombre: "Pan",
        precio: 2800,
        tipo_medicion: "kg",
        activo: true
    });

    const producto = await productoService.crearProducto({
        nombre: "Pan",
        precio: 100,
        tipo_medicion: "kg"
    });

    expect(producto.nombre).toBe("Pan");

    expect(productoRepository.crearProducto)
        .toHaveBeenCalled();

    expect(productoRepository.crearProducto)
        .toHaveBeenCalledWith({
          nombre: "Pan",
          precio: 100,
          tipo_medicion: "kg"
    });
  })
})
