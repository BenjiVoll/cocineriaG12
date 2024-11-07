"use strict";
import Joi from "joi";

export const platoBodyValidation = Joi.object({
  nombre: Joi.string().min(3).max(255).required().messages({
    "string.base": "El nombre debe ser un string.",
    "string.min": "El nombre debe tener al menos 3 caracteres.",
    "string.max": "El nombre debe tener como máximo 255 caracteres.",
    "any.required": "El nombre es obligatorio.",
  }),
  descripcion: Joi.string().min(10).max(255).optional().messages({
    "string.base": "La descripción debe ser de tipo string.",
    "string.min": "La descripción debe tener como mínimo 10 caracteres.",
    "string.max": "La descripción debe tener como máximo 255 caracteres.",
  }),
  precio: Joi.number().positive().required().messages({
    "number.base": "El precio debe ser un número.",
    "number.positive": "El precio debe ser un número positivo.",
    "any.required": "El precio es obligatorio.",
  }),
  disponible: Joi.boolean().optional().messages({
    "boolean.base": "Disponible debe ser un valor booleano.",
  }),
  ingredientesIds: Joi.array().items(Joi.number().integer().positive()).required().messages({
    "array.base": "Los ingredientes deben ser un array de IDs.",
    "any.required": "Los IDs de los ingredientes son obligatorios.",
  }),
});


export const platoUpdateValidation = Joi.object({
  nombre: Joi.string().min(3).max(255).optional().messages({
    "string.base": "El nombre debe ser un string.",
    "string.min": "El nombre debe tener al menos 3 caracteres.",
    "string.max": "El nombre debe tener como máximo 255 caracteres.",
  }),
  descripcion: Joi.string().min(10).max(255).optional().messages({
    "string.base": "La descripción debe ser de tipo string.",
    "string.min": "La descripción debe tener como mínimo 10 caracteres.",
    "string.max": "La descripción debe tener como máximo 255 caracteres.",
  }),
  precio: Joi.number().positive().optional().messages({
    "number.base": "El precio debe ser un número.",
    "number.positive": "El precio debe ser un número positivo.",
  }),
  disponible: Joi.boolean().optional().messages({
    "boolean.base": "Disponible debe ser un valor booleano.",
  }),
  ingredientesIds: Joi.array().items(Joi.number().integer().positive()).optional().messages({
    "array.base": "Los ingredientes deben ser un array de IDs.",
  }),
});


