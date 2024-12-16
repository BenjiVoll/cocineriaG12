"use strict";
import Joi from "joi";

export const personalQueryValidation = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El id debe ser un número.",
      "number.integer": "El id debe ser un número entero.",
      "number.positive": "El id debe ser un número positivo.",
    }),
  cargo: Joi.string()
    .max(100)
    .messages({
      "string.base": "El cargo debe ser de tipo string.",
      "string.max": "El cargo no debe exceder los 100 caracteres.",
    }),
})
  .or("id", "cargo")
  .unknown(true)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un parámetro: id o cargo.",
  });

export const personalBodyValidation = Joi.object({
  nombreCompleto: Joi.string()
    .pattern(/^[A-Z][a-z]*\s[A-Z][a-z]*$/)
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "El nombre completo debe ser de tipo string.",
      "string.pattern.base": "El nombre completo debe tener la primera letra en mayúscula y estar separado por un espacio.",
      "string.min": "El nombre completo debe tener al menos 3 caracteres.",
      "string.max": "El nombre completo no debe exceder los 100 caracteres.",
      "any.required": "El nombre completo es requerido.",
    }),
  telefono: Joi.string()
    .length(9)
    .pattern(/^9\d{8}$/)
    .required()
    .messages({
      "string.base": "El teléfono debe ser de tipo string.",
      "string.length": "El teléfono debe tener exactamente 9 dígitos.",
      "string.pattern.base": "El teléfono solo debe contener dígitos numéricos y empezar con 9.",
      "any.required": "El teléfono es requerido.",
    }),
  fechaIncorporacion: Joi.date()
    .iso()
    .min('2024-01-01')
    .max('2025-12-31')
    .allow(null)
    .messages({
      "date.base": "La fecha de incorporación debe ser una fecha válida en formato ISO.",
      "date.min": "La fecha de incorporación no puede ser antes del año 2024.",
      "date.max": "La fecha de incorporación no puede ser después del año 2025.",
    }),
  cargo: Joi.string()
    .valid('cocinero', 'administrador', 'mesero')
    .required()
    .messages({
      "string.base": "El cargo debe ser de tipo string.",
      "any.only": "El cargo debe ser cocinero, administrador o mesero.",
      "any.required": "El cargo es requerido.",
    }),
  createdAt: Joi.date()
    .iso()
    .messages({
      "date.base": "La fecha de creación debe ser una fecha válida en formato ISO.",
    }),
  updatedAt: Joi.date()
    .iso()
    .messages({
      "date.base": "La fecha de actualización debe ser una fecha válida en formato ISO.",
    }),
})
  .unknown(true)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar los campos requeridos del personal.",
  });
