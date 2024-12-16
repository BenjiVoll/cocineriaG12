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
  .or("id","estado")
  .unknown(true)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un parámetro: id o estado.",
  });

  export const orderBodyValidation = Joi.object({
    productos: Joi.string()
      .required()
      .messages({
        "string.base": "El campo productos debe ser de tipo string.",
        "any.required": "El campo productos es requerido.",
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
    .unknown(true)
    .messages({
      "object.unknown": "No se permiten propiedades adicionales.",
      "object.missing": "Debes proporcionar los campos requeridos del pedido.",
    });
  