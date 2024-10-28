"use strict";
import { AppDataSource } from "../config/configDb.js";
import Plato from "../entity/plato.entity.js";
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