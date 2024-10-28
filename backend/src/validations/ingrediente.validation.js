"use strict";
import Joi from "joi";

export const ingredienteBodyValidation = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({
      "string.base": "El nombre debe ser un string.",
      "string.min": "El nombre debe tener al menos 3 caracteres.",
      "string.max": "El nombre debe tener como máximo 255 caracteres.",
      "any.required": "El nombre es obligatorio.",
    }),
  cantidad: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "La cantidad debe ser un número.",
      "number.integer": "La cantidad debe ser un número entero.",
      "number.positive": "La cantidad debe ser un número positivo.",
      "any.required": "La cantidad es obligatoria.",
    }),
});

