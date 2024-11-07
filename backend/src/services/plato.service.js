"use strict";
import { AppDataSource } from "../config/configDb.js";
import Plato from "../entity/plato.entity.js";

export async function createPlatoService(data) {
  try {
    const platoRepository = AppDataSource.getRepository(Plato);

    const existingPlato = await platoRepository.findOne({
      where: [{ nombre: data.nombre }],
    });

    if (existingPlato) {
      return [null, "Ya existe un plato con el mismo nombre"];
    }

    const newPlato = platoRepository.create({
      nombre: data.nombre,
      descripcion: data.descripcion,
      precio: data.precio,
      disponible: data.disponible,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await platoRepository.save(newPlato);

    return [newPlato, null];
  } catch (error) {
    console.error("Error al crear un plato:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getPlatoService() {
  try {
    const platoRepository = AppDataSource.getRepository(Plato);

    const platos = await platoRepository.find();

    if (!platos || platos.length === 0) {
      return [null, "No hay platos disponibles"];
    }

    console.log("Platos encontrados:", platos);
    return [platos, null];
  } catch (error) {
    console.error("Error al obtener los platos:", error);
    return [null, "Error interno del servidor"];
  }
}


export async function getPlatosService() {
  try {
    const platoRepository = AppDataSource.getRepository(Plato);

    const platos = await platoRepository.find();

    if (!platos || platos.length === 0) return [null, "No hay platos"];

    return [platos, null];
  } catch (error) {
    console.error("Error al obtener los platos:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updatePlatoService(id, body) {
  try {
    const platoRepository = AppDataSource.getRepository(Plato);

    const platoFound = await platoRepository.findOne({
      where: { id },
    });

    if (!platoFound) return [null, "Plato no encontrado"];

    if (body.nombre) {
      const existingPlato = await platoRepository.findOne({
        where: { nombre: body.nombre },
      });

      if (existingPlato && existingPlato.id !== platoFound.id) {
        return [null, "Ya existe un plato con el mismo nombre"];
      }
    }

    const dataPlatoUpdate = {};
    if (body.nombre) dataPlatoUpdate.nombre = body.nombre;
    if (body.descripcion) dataPlatoUpdate.descripcion = body.descripcion;
    if (body.precio) dataPlatoUpdate.precio = body.precio;
    if (body.disponible !== undefined) dataPlatoUpdate.disponible = body.disponible;
    if (Object.keys(dataPlatoUpdate).length > 0) {
      dataPlatoUpdate.updatedAt = new Date();
    }

    await platoRepository.update({ id: platoFound.id }, dataPlatoUpdate);

    const platoData = await platoRepository.findOne({
      where: { id: platoFound.id },
    });

    if (!platoData) {
      return [null, "Plato no encontrado después de actualizar"];
    }

    return [platoData, null];
  } catch (error) {
    console.error("Error al modificar un plato:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deletePlatoService(id) {
  try {
    const platoRepository = AppDataSource.getRepository(Plato);

    const platoFound = await platoRepository.findOne({ where: { id } });

    if (!platoFound) return [null, "Plato no encontrado"];

    await platoRepository.remove(platoFound);

    return [platoFound, null];
  } catch (error) {
    console.error("Error al eliminar el plato:", error);
    return [null, "Error interno del servidor"];
  }
}




