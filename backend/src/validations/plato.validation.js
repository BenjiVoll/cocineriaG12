"use strict";
import Joi from "joi";

export const platoBodyValidation = Joi.object({
  nombre: Joi.string()
    .pattern(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/)
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.base": "El nombre debe ser un string.",
      "string.pattern.base": "El nombre solo puede contener letras, números, espacios y acentos.",
      "string.min": "El nombre debe tener al menos 3 caracteres.",
      "string.max": "El nombre debe tener como máximo 50 caracteres.",
      "any.required": "El nombre es obligatorio.",
    }),
  descripcion: Joi.string()
    .pattern(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/)
    .min(10)
    .max(255)
    .optional()
    .messages({
      "string.base": "La descripción debe ser de tipo string.",
      "string.pattern.base": "La descripción solo puede contener letras, números, espacios y acentos.",
      "string.min": "La descripción debe tener como mínimo 10 caracteres.",
      "string.max": "La descripción debe tener como máximo 255 caracteres.",
    }),
  precio: Joi.number()
    .integer()
    .positive()
    .min(100)
    .max(1000000)
    .required()
    .messages({
      "number.base": "El precio debe ser un número.",
      "number.integer": "El precio debe ser un número entero.",
      "number.positive": "El precio debe ser un número positivo.",
      "number.min": "El precio debe ser al menos 100 CLP.",
      "number.max": "El precio no puede exceder 1.000.000 CLP.",
      "any.required": "El precio es obligatorio.",
    }),
  disponible: Joi.boolean().optional().messages({
    "boolean.base": "Disponible debe ser un valor booleano.",
  }),
  ingredientesIds: Joi.array().items(Joi.number().integer().positive()).optional().messages({
    "array.base": "Los ingredientes deben ser un array de IDs.",
  }),
});

export const platoUpdateValidation = Joi.object({
  nombre: Joi.string()
    .pattern(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/)
    .min(3)
    .max(50)
    .optional()
    .messages({
      "string.base": "El nombre debe ser un string.",
      "string.pattern.base": "El nombre solo puede contener letras, números, espacios y acentos.",
      "string.min": "El nombre debe tener al menos 3 caracteres.",
      "string.max": "El nombre debe tener como máximo 50 caracteres.",
    }),
  descripcion: Joi.string()
    .pattern(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/)
    .min(10)
    .max(255)
    .optional()
    .messages({
      "string.base": "La descripción debe ser de tipo string.",
      "string.pattern.base": "La descripción solo puede contener letras, números, espacios y acentos.",
      "string.min": "La descripción debe tener como mínimo 10 caracteres.",
      "string.max": "La descripción debe tener como máximo 255 caracteres.",
    }),
  precio: Joi.number()
    .integer()
    .positive()
    .min(100)
    .max(1000000)
    .optional()
    .messages({
      "number.base": "El precio debe ser un número.",
      "number.integer": "El precio debe ser un número entero.",
      "number.positive": "El precio debe ser un número positivo.",
      "number.min": "El precio debe ser al menos 100 CLP.",
      "number.max": "El precio no puede exceder 1.000.000 CLP.",
    }),
  disponible: Joi.boolean().optional().messages({
    "boolean.base": "Disponible debe ser un valor booleano.",
  }),
  ingredientesIds: Joi.array().items(Joi.number().integer().positive()).optional().messages({
    "array.base": "Los ingredientes deben ser un array de IDs.",
  }),
});



