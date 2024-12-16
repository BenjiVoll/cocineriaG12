"use strict";
import Ingrediente from "../entity/ingrediente.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createIngredienteService(data) {
  try {
    const ingredienteRepository = AppDataSource.getRepository(Ingrediente);

    const existingIngrediente = await ingredienteRepository.findOne({
      where: { nombre: data.nombre },
    });

    if (existingIngrediente) {
      return [null, "Ya existe un ingrediente con el mismo nombre"];
    }

    const newIngrediente = ingredienteRepository.create(data);
    await ingredienteRepository.save(newIngrediente);

    return [newIngrediente, null];
  } catch (error) {
    console.error("Error al crear un ingrediente:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getIngredienteService() {
  try {
    const ingredienteRepository = AppDataSource.getRepository(Ingrediente);

    const ingredientes = await ingredienteRepository.find();

    if (!ingredientes || ingredientes.length === 0) {
      return [null, "No hay ingredientes disponibles"];
    }

    console.log("Ingredientes encontrados:", ingredientes);
    return [ingredientes, null];
  } catch (error) {
    console.error("Error al obtener los ingredientes:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getIngredientesService(id) {
  try {
    const ingredienteRepository = AppDataSource.getRepository(Ingrediente);

    const ingrediente = await ingredienteRepository.findOne({
      where: { id: id },
    });

    if (!ingrediente) {
      return [null, "Ingrediente no encontrado"];
    }

    return [ingrediente, null];
  } catch (error) {
    console.error("Error al obtener el ingrediente:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateIngredienteService(id, body) {
  try {
    const ingredienteRepository = AppDataSource.getRepository(Ingrediente);

    const ingredienteFound = await ingredienteRepository.findOne({
      where: { id },
    });

    if (!ingredienteFound) return [null, "Ingrediente no encontrado"];
    
    if (body.nombre) {
      const existingIngrediente = await ingredienteRepository.findOne({
        where: { nombre: body.nombre },
      });

      if (existingIngrediente && existingIngrediente.id !== ingredienteFound.id) {
        return [null, "Ya existe un ingrediente con el mismo nombre"];
      }
    }

    const dataIngredienteUpdate = {};
    if (body.nombre) dataIngredienteUpdate.nombre = body.nombre;
    if (body.cantidad) dataIngredienteUpdate.cantidad = body.cantidad;
    if (Object.keys(dataIngredienteUpdate).length > 0) {
      dataIngredienteUpdate.updatedAt = new Date();
    }

    await ingredienteRepository.update({ id: ingredienteFound.id }, dataIngredienteUpdate);

    const ingredienteData = await ingredienteRepository.findOne({
      where: { id: ingredienteFound.id },
    });

    if (!ingredienteData) {
      return [null, "Ingrediente no encontrado después de actualizar"];
    }

    return [ingredienteData, null];
  } catch (error) {
    console.error("Error al modificar un ingrediente:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteIngredienteService(id) {
  try {
    const ingredienteRepository = AppDataSource.getRepository(Ingrediente);

    const ingredienteFound = await ingredienteRepository.findOne({ where: { id } });

    if (!ingredienteFound) return [null, "Ingrediente no encontrado"];

    await ingredienteRepository.remove(ingredienteFound);

    return [ingredienteFound, null];
  } catch (error) {
    console.error("Error al eliminar el ingrediente:", error);
    return [null, "Error interno del servidor"];
  }
}

