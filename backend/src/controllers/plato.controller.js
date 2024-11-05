"use strict";
import { actualizarPlato,
     crearPlato, 
     obtenerPlatosDisponibles } from "../services/plato.service.js";

export const crearPlatoController = async (req, res) => {
  try {
    const plato = await crearPlato(req.body);
    res.status(201).json(plato);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const actualizarPlatoController = async (req, res) => {
  try {
    const plato = await actualizarPlato(req.params.id, req.body);
    res.status(200).json(plato);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerPlatosDisponiblesController = async (req, res) => {
  try {
    const platos = await obtenerPlatosDisponibles();
    res.status(200).json(platos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};