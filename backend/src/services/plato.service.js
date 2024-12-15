"use strict";
import { AppDataSource } from "../config/configDb.js";
import Plato from "../entity/plato.entity.js";
import Ingrediente from "../entity/ingrediente.entity.js";
import { platoBodyValidation, platoUpdateValidation } from "../validations/plato.validation.js";
import { In } from 'typeorm';

export async function createPlatoService(data) {
  try {
    // Validar los datos de entrada
    const { error } = platoBodyValidation.validate(data);
    if (error) {
      return [null, error.details[0].message];
    }

    const platoRepository = AppDataSource.getRepository(Plato);
    
    const nuevoPlato = platoRepository.create({
      nombre: data.nombre,
      descripcion: data.descripcion,
      precio: data.precio,
      disponible: data.disponible,
    });

    await platoRepository.save(nuevoPlato);
    return [nuevoPlato, null];
  } catch (error) {
    console.error("Error al crear el plato:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getPlatosService(platoId) {
  try {
    const platoRepository = AppDataSource.getRepository(Plato);

    const plato = await platoRepository.findOne({
      where: { id: platoId },
      relations: ["ingredientes"],
    });

    if (!plato) return [null, "Plato no encontrado"];

    return [plato, null];
  } catch (error) {
    console.error("Error al obtener el plato:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getPlatoService() {
  try {
    const platoRepository = AppDataSource.getRepository(Plato);

    const platos = await platoRepository.find({ relations: ["ingredientes"] });

    return [platos, null];
  } catch (error) {
    console.error("Error al obtener los platos:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updatePlatoService(platoId, data) {
  try {
    // Validar los datos de entrada
    const { error } = platoUpdateValidation.validate(data);
    if (error) {
      return [null, error.details[0].message];
    }

    const platoRepository = AppDataSource.getRepository(Plato);
    const ingredienteRepository = AppDataSource.getRepository(Ingrediente);

    const plato = await platoRepository.findOne({
      where: { id: platoId },
      relations: ["ingredientes"],
    });

    if (!plato) {
      return [null, "Plato no encontrado"];
    }

    // Actualizar solo los datos proporcionados
    Object.assign(plato, data);

    // Si se proporcionan nuevos IDs de ingredientes, combinar con los existentes
    if (data.ingredientesIds) {
      const existingIngredients = plato.ingredientes.map(ing => ing.id);
      const combinedIngredientsIds = [...new Set([...existingIngredients, ...data.ingredientesIds])];
      const ingredientes = await ingredienteRepository.findBy({ id: In(combinedIngredientsIds) });
      if (ingredientes.length !== combinedIngredientsIds.length) {
        return [null, "Algunos ingredientes no fueron encontrados"];
      }
      plato.ingredientes = ingredientes;
    }

    await platoRepository.save(plato);
    return [plato, null];
  } catch (error) {
    console.error("Error al actualizar el plato:", error);
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

