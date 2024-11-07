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
    .max(255)
    .required()
    .messages({
      "string.base": "El nombre completo debe ser de tipo string.",
      "string.max": "El nombre completo no debe exceder los 255 caracteres.",
      "any.required": "El nombre completo es requerido.",
    }),
  telefono: Joi.string()
    .length(9)
    .pattern(/^\d+$/)
    .required()
    .messages({
      "string.base": "El teléfono debe ser de tipo string.",
      "string.length": "El teléfono debe tener exactamente 9 dígitos.",
      "string.pattern.base": "El teléfono solo debe contener dígitos numéricos.",
      "any.required": "El teléfono es requerido.",
    }),
  fechaIncorporacion: Joi.date()
    .iso()
    .allow(null)
    .messages({
      "date.base": "La fecha de incorporación debe ser una fecha válida en formato ISO.",
    }),
  cargo: Joi.string()
    .max(100)
    .required()
    .messages({
      "string.base": "El cargo debe ser de tipo string.",
      "string.max": "El cargo no debe exceder los 100 caracteres.",
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
