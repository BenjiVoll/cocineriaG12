"use strict";
import {
  addOrderService,
  deleteOrderService,
  getOrderService,
  getOrdersService,
  updateOrderService,
} from "../services/order.service.js";
import {
  orderBodyValidation,
  orderQueryValidation,
} from "../validations/order.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getOrder(req, res) {
  try {
    // Obtener el ID desde la query string y convertirlo a entero
    const id = parseInt(req.query.id, 10);

    // Validar que el ID sea un número válido
    if (isNaN(id)) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        "El ID debe ser un número válido"
      );
    }

    // Validar el ID con la lógica de validación
    const { error: queryError } = orderQueryValidation.validate({ id });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message
      );
    }

    // Llamar al servicio para obtener el pedido
    const [order, errorOrder] = await getOrderService(id);

    if (errorOrder) {
      return handleErrorClient(res, 404, "Pedido no encontrado", errorOrder);
    }

    // Respuesta exitosa
    handleSuccess(res, 200, "Pedido encontrado", order);
  } catch (error) {
    // Manejar errores del servidor
    handleErrorServer(res, 500, error.message);
  }
}


export async function getOrders(req, res) {
  try {
    const [orders, errorOrders] = await getOrdersService();

    if (errorOrders) return handleErrorClient(res, 404, errorOrders);

    orders.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Pedidos encontrados", orders);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function addOrder(req, res) {
  try {
    const { body } = req;

    // Validar el cuerpo de la solicitud
    const { error: bodyError } = orderBodyValidation.validate(body);

    if (bodyError)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );

    // Llama al servicio para agregar la orden
    const [newOrder, orderError] = await addOrderService(body);

    if (orderError) return handleErrorClient(res, 400, "Error agregando el pedido", orderError);

    handleSuccess(res, 201, "Pedido creado correctamente", newOrder);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateOrder(req, res) {
  try {
    // Obtener el ID desde la query string y convertirlo a entero
    const id = parseInt(req.query.id, 10);
    const { body } = req;

    // Validar que el ID sea un número válido
    if (isNaN(id)) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        "El ID debe ser un número válido"
      );
    }

    // Validar el ID con la lógica de validación
    const { error: queryError } = orderQueryValidation.validate({ id });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message
      );
    }

    // Validar el cuerpo de la solicitud
    const { error: bodyError } = orderBodyValidation.validate(body);

    if (bodyError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message
      );
    }

    // Llamar al servicio con el ID numérico
    const [order, orderError] = await updateOrderService(id, body);

    if (orderError) {
      return handleErrorClient(
        res,
        400,
        "Error modificando el pedido",
        orderError
      );
    }

    // Respuesta exitosa
    handleSuccess(res, 200, "Pedido modificado correctamente", order);
  } catch (error) {
    // Manejar errores del servidor
    handleErrorServer(res, 500, error.message);
  }
}


export async function deleteOrder(req, res) {
  try {
    // Obtener el ID desde la query string y convertirlo a entero
    const id = parseInt(req.query.id, 10);

    // Validar que el ID sea un número válido
    if (isNaN(id)) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        "El ID debe ser un número válido"
      );
    }

    // Validar el ID con la lógica de validación
    const { error: queryError } = orderQueryValidation.validate({ id });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message
      );
    }

    // Llamar al servicio para eliminar el pedido
    const [orderDelete, errorOrderDelete] = await deleteOrderService(id);

    if (errorOrderDelete) {
      return handleErrorClient(
        res,
        404,
        "Error eliminando el pedido",
        errorOrderDelete
      );
    }

    // Respuesta exitosa
    handleSuccess(res, 200, "Pedido eliminado correctamente", orderDelete);
  } catch (error) {
    // Manejar errores del servidor
    handleErrorServer(res, 500, error.message);
  }
}
