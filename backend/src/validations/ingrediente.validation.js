"use strict";
import Joi from "joi";

<<<<<<< HEAD
export const ingredienteQueryValidation = Joi.object({
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

  export const ingredienteBodyValidation = Joi.object({
    nombre: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        "string.empty": "El nombre no puede estar vacío.",
        "string.base": "El nombre debe ser de tipo string.",
        "string.min": "El nombre debe tener como mínimo 3 caracteres.",
        "string.max": "El nombre debe tener como máximo 50 caracteres.",
      }),
    cantidad: Joi.number()
      .integer()
      .positive()
      .required()
      .messages({
        "number.base": "La cantidad debe ser un número.",
        "number.integer": "La cantidad debe ser un número entero.",
        "number.positive": "La cantidad debe ser un número positivo.",
      }),
  })
    .unknown(false)
    .messages({
      "object.unknown": "No se permiten propiedades adicionales.",
    });
  
export const ingredienteUpdateValidation = Joi.object({
  nombre: Joi.string().min(3).max(255).optional().messages({
    "string.base": "El nombre debe ser un string.",
    "string.min": "El nombre debe tener al menos 3 caracteres.",
    "string.max": "El nombre debe tener como máximo 255 caracteres.",
  }),
  cantidad: Joi.number().positive().optional().messages({
    "number.base": "La cantidad debe ser un número.",
    "number.positive": "La cantidad debe ser un número positivo.",
  }),
});


=======
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

>>>>>>> rama_cocina_3
