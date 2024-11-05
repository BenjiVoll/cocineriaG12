"use strict";
import Joi from "joi";

export const platoBodyValidation = Joi.object({
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
  descripcion: Joi.string()
        .min(10)
        .max(255)
        .messages({
        "string.empty": "La descripción no puede estar vacía.",
        "string.base": "La descripción debe ser de tipo string.",
        "string.min": "La descripción debe tener como mínimo 10 caracteres.",
        "string.max": "La descripción debe tener como máximo 255 caracteres.",
    }),
  precio: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "El precio debe ser un número.",
      "number.positive": "El precio debe ser un número positivo.",
      "any.required": "El precio es obligatorio.",
    }),
  ingredientes: Joi.array()
    .items(Joi.number().integer().positive().required())
    .min(1)
    .required()
    .messages({
      "array.base": "Los ingredientes deben ser un array.",
      "array.min": "Debe haber al menos un ingrediente.",
      "any.required": "Los ingredientes son obligatorios.",
    }),
});
