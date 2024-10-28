"use strict";
import { AppDataSource } from "../config/configDb.js";
import Ingrediente from "../entity/ingrediente.entity.js";

const ingredienteRepository = AppDataSource.getRepository(Ingrediente);

export const crearIngrediente = async (data) => {
  const { nombre, cantidad } = data;
  const ingrediente = new Ingrediente();
  ingrediente.nombre = nombre;
  ingrediente.cantidad = cantidad;

  await ingredienteRepository.save(ingrediente);
  return ingrediente;
};

export const actualizarIngrediente = async (id, data) => {
  const ingrediente = await ingredienteRepository.findOneBy({ id });
  if (!ingrediente) throw new Error("Ingrediente no encontrado");

  Object.assign(ingrediente, data);
  await ingredienteRepository.save(ingrediente);
  return ingrediente;
};

export const obtenerIngredientes = async () => {
  return await ingredienteRepository.find();
};
