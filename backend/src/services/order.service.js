"use strict";
import Order from "../entity/order.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getOrderService(query) {
  try {
    const { id, estado } = query;

    const orderRepository = AppDataSource.getRepository(Order);

    const orderFound = await orderRepository.findOne({
      where: [{ id: id }, { estado: estado }],
    });

    if (!orderFound) return [null, "Pedido no encontrado"];

    return [orderFound, null];
  } catch (error) {
    console.error("Error al obtener el pedido:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getOrdersService() {
  try {
    const orderRepository = AppDataSource.getRepository(Order);

    const orders = await orderRepository.find();

    if (!orders || orders.length === 0) return [null, "No hay pedidos"];

    return [orders, null];
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateOrderService(query, body) {
  try {
    const { id, estado } = query;

    const orderRepository = AppDataSource.getRepository(Order);

    const orderFound = await orderRepository.findOne({
      where: [{ id: id }, { estado: estado }],
    });

    if (!orderFound) return [null, "Pedido no encontrado"];

    const dataOrderUpdate = {
      productos: body.productos,
      precioTotal: body.precioTotal,
      estado: body.estado,
      metodoPago: body.metodoPago,
      fechaEntrega: body.fechaEntrega,
      updatedAt: new Date(),
    };

    await orderRepository.update({ id: orderFound.id }, dataOrderUpdate);

    const orderData = await orderRepository.findOne({
      where: { id: orderFound.id },
    });

    if (!orderData) {
      return [null, "Pedido no encontrado después de actualizar"];
    }

    return [orderData, null];
  } catch (error) {
    console.error("Error al modificar el pedido:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteOrderService(query) {
  try {
    const { id, estado } = query;

    const orderRepository = AppDataSource.getRepository(Order);

    const orderFound = await orderRepository.findOne({
      where: [{ id: id }, { estado: estado }],
    });

    if (!orderFound) return [null, "Pedido no encontrado"];

    const orderDeleted = await orderRepository.remove(orderFound);

    return [orderDeleted, null];
  } catch (error) {
    console.error("Error al eliminar el pedido:", error);
    return [null, "Error interno del servidor"];
  }
}
