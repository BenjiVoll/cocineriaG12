"use strict";
import { crearIngrediente, actualizarIngrediente, obtenerIngredientes } from "../services/ingredienteService.js";

export const crearIngredienteController = async (req, res) => {
  try {
    const ingrediente = await crearIngrediente(req.body);
    res.status(201).json(ingrediente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const actualizarIngredienteController = async (req, res) => {
  try {
    const ingrediente = await actualizarIngrediente(req.params.id, req.body);
    res.status(200).json(ingrediente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerIngredientesController = async (req, res) => {
  try {
    const ingredientes = await obtenerIngredientes();
    res.status(200).json(ingredientes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};