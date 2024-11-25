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
    const { id } = req.query;

    const { error } = orderQueryValidation.validate({ id });

    if (error) return handleErrorClient(res, 400, error.message);

    const [order, errorOrder] = await getOrderService({ id });

    if (errorOrder) return handleErrorClient(res, 404, errorOrder);

    handleSuccess(res, 200, "Pedido encontrado", order);
  } catch (error) {
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

    const { error: bodyError } = orderBodyValidation.validate(body);

    if (bodyError)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );

    const [newOrder, orderError] = await addOrderService(body);

    if (orderError) return handleErrorClient(res, 400, "Error agregando el pedido", orderError);

    handleSuccess(res, 201, "Pedido creado correctamente", newOrder);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateOrder(req, res) {
  try {
    const { id } = req.query;
    const { body } = req;

    const { error: queryError } = orderQueryValidation.validate({ id });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const { error: bodyError } = orderBodyValidation.validate(body);

    if (bodyError)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );

    const [order, orderError] = await updateOrderService({ id }, body);

    if (orderError) return handleErrorClient(res, 400, "Error modificando el pedido", orderError);

    handleSuccess(res, 200, "Pedido modificado correctamente", order);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteOrder(req, res) {
  try {
    const { id } = req.query;

    const { error: queryError } = orderQueryValidation.validate({ id });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const [orderDelete, errorOrderDelete] = await deleteOrderService({ id });

    if (errorOrderDelete) return handleErrorClient(res, 404, "Error eliminando el pedido", errorOrderDelete);

    handleSuccess(res, 200, "Pedido eliminado correctamente", orderDelete);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
