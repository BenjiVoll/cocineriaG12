"use strict";
import { AppDataSource } from "../config/configDb.js";
import Plato from "../entity/plato.entity.js";
<<<<<<< HEAD

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




=======
import Ingrediente from "../entity/ingrediente.entity.js";

const platoRepository = AppDataSource.getRepository(Plato);
const ingredienteRepository = AppDataSource.getRepository(Ingrediente);

export const crearPlato = async (data) => {
  const { nombre, descripcion, precio, ingredientes } = data;
  const plato = new Plato();
  plato.nombre = nombre;
  plato.descripcion = descripcion;
  plato.precio = precio;
  plato.disponible = true;

  await platoRepository.save(plato);

  for (let id of ingredientes) {
    const ingrediente = await ingredienteRepository.findOneBy({ id });
    if (!ingrediente) {
      throw new Error(`Ingrediente con id ${id} no encontrado`);
    }
  }

  return plato;
};

export const actualizarPlato = async (id, data) => {
  const plato = await platoRepository.findOneBy({ id });
  if (!plato) throw new Error("Plato no encontrado");

  Object.assign(plato, data);
  await platoRepository.save(plato);
  return plato;
};

export const obtenerPlatosDisponibles = async () => {
  const platos = await platoRepository.find();
  return platos;
};
>>>>>>> rama_cocina_3
