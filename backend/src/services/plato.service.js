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

    const platos = await platoRepository.find({
      relations: ["ingredientes"],
    });

    const platosFormateados = platos.map(plato => ({
      id: plato.id,
      nombre: plato.nombre,
      descripcion: plato.descripcion,
      precio: plato.precio,
      disponible: plato.disponible ? 'Sí' : 'No',
      ingredientes: plato.ingredientes.map(ingrediente => ingrediente.nombre),
      createdAt: plato.createdAt
    }));

    return [platosFormateados, null];
  } catch (error) {
    console.error("Error al obtener platos:", error);
    return [null, error];
  }
}



export async function updatePlatoService(platoId, data) {
  try {
    const platoRepository = AppDataSource.getRepository(Plato);
    const ingredienteRepository = AppDataSource.getRepository(Ingrediente);

    const plato = await platoRepository.findOne({
      where: { id: platoId },
      relations: ["ingredientes"],
    });

    if (!plato) {
      return [null, "Plato no encontrado"];
    }
    
    if (data.nombre) plato.nombre = data.nombre;
    if (data.descripcion) plato.descripcion = data.descripcion;
    if (data.precio) plato.precio = data.precio;
    if (data.disponible != null) plato.disponible = data.disponible;

    
    if (data.ingredientesIds) {
      const ingredientes = await ingredienteRepository.find({
        where: { id: In(data.ingredientesIds) }
      });
      if (ingredientes.length !== data.ingredientesIds.length) {
        return [null, "Algunos ingredientes no fueron encontrados"];
      }

      
      const ingredientesActualesIds = new Set(plato.ingredientes.map(ingrediente => ingrediente.id));

      
      const nuevosIngredientes = ingredientes.filter(
        ingrediente => !ingredientesActualesIds.has(ingrediente.id)
      );

      // Agregar los nuevos ingredientes al plato
      plato.ingredientes = [...plato.ingredientes, ...nuevosIngredientes];
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

