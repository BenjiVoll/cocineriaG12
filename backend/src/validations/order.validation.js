"use strict";
import Joi from "joi";

export const orderQueryValidation = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El id debe ser un número.",
      "number.integer": "El id debe ser un número entero.",
      "number.positive": "El id debe ser un número positivo.",
    }),
  estado: Joi.string()
    .valid("pendiente", "en proceso", "completado", "cancelado")
    .messages({
      "string.base": "El estado debe ser de tipo string.",
      "any.only": "El estado debe ser 'pendiente', 'en proceso', 'completado' o 'cancelado'.",
    }),
})
  .or("id", "estado")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un parámetro: id o estado.",
  });

export const orderBodyValidation = Joi.object({
  productos: Joi.array()
    .items(
      Joi.object({
        productoId: Joi.number().integer().positive().required().messages({
          "number.base": "El productoId debe ser un número.",
          "number.integer": "El productoId debe ser un número entero.",
          "number.positive": "El productoId debe ser un número positivo.",
          "any.required": "El productoId es requerido en cada producto.",
        }),
        cantidad: Joi.number().integer().positive().required().messages({
          "number.base": "La cantidad debe ser un número.",
          "number.integer": "La cantidad debe ser un número entero.",
          "number.positive": "La cantidad debe ser un número positivo.",
          "any.required": "La cantidad es requerida en cada producto.",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Los productos deben ser un array.",
      "array.min": "Debe incluir al menos un producto.",
      "any.required": "Los productos son requeridos.",
    }),
  precioTotal: Joi.number()
    .precision(2)
    .positive()
    .required()
    .messages({
      "number.base": "El precioTotal debe ser un número.",
      "number.positive": "El precioTotal debe ser un número positivo.",
      "any.required": "El precioTotal es requerido.",
    }),
  estado: Joi.string()
    .valid("pendiente", "en proceso", "completado", "cancelado")
    .default("pendiente")
    .messages({
      "string.base": "El estado debe ser de tipo string.",
      "any.only": "El estado debe ser 'pendiente', 'en proceso', 'completado' o 'cancelado'.",
    }),
  metodoPago: Joi.string()
    .max(50)
    .allow(null)
    .messages({
      "string.base": "El método de pago debe ser de tipo string.",
      "string.max": "El método de pago no debe exceder los 50 caracteres.",
    }),
  fechaEntrega: Joi.date()
    .iso()
    .allow(null)
    .messages({
      "date.base": "La fecha de entrega debe ser una fecha válida en formato ISO.",
    }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar los campos requeridos del pedido.",
  });
