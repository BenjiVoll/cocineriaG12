"use strict";
import Joi from "joi";

export const platoQueryValidation = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El id debe ser un número.",
      "number.integer": "El id debe ser un número entero.",
      "number.positive": "El id debe ser un número positivo.",
    }),
  nombre: Joi.string()
    .min(3)
    .max(50)
    .messages({
      "string.empty": "El nombre no puede estar vacío.",
      "string.base": "El nombre debe ser de tipo string.",
      "string.min": "El nombre debe tener como mínimo 3 caracteres.",
      "string.max": "El nombre debe tener como máximo 50 caracteres.",
    }),
})
  .or("id", "nombre")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un parámetro: id o nombre.",
  });

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
    disponible: Joi.boolean()
    .required()
    .messages({
      "boolean.base": "El campo disponible debe ser de tipo booleano.",
      "any.required": "El campo disponible es obligatorio.",
    }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un campo: nombre, descripcion, precio, ingredientes.",
  });

export const platoUpdateValidation = Joi.object({
  nombre: Joi.string().min(3).max(255).optional().messages({
    "string.base": "El nombre debe ser un string.",
    "string.min": "El nombre debe tener al menos 3 caracteres.",
    "string.max": "El nombre debe tener como máximo 255 caracteres.",
  }),
  descripcion: Joi.string().min(10).max(255).optional().messages({
    "string.empty": "La descripción no puede estar vacía.",
    "string.base": "La descripción debe ser de tipo string.",
    "string.min": "La descripción debe tener como mínimo 10 caracteres.",
    "string.max": "La descripción debe tener como máximo 255 caracteres.",
  }),
  precio: Joi.number().positive().optional().messages({
    "number.base": "El precio debe ser un número.",
    "number.positive": "El precio debe ser un número positivo.",
  }),
  disponible: Joi.boolean().optional().messages({
    "boolean.base": "El campo disponible debe ser de tipo booleano.",
  }),
  ingredientes: Joi.array()
    .items(Joi.number().integer().positive().optional())
    .min(0)
    .optional()
    .messages({
      "array.base": "Los ingredientes deben ser un array.",
    }),
});
