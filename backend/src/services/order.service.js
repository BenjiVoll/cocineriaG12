"use strict";
import Order from "../entity/order.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { orderBodyValidation } from "../validations/order.validation.js";

export async function getOrderService(id) {
  try {
    const orderRepository = AppDataSource.getRepository(Order);

    const orderFound = await orderRepository.findOne({
      where: { id },
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

export async function addOrderService(data) {
  try {
    const { error } = orderBodyValidation.validate(data);
    if (error) {
      return [null, error.details[0].message];
    }

    const orderRepository = AppDataSource.getRepository(Order);

    const newOrder = orderRepository.create(data);

    await orderRepository.save(newOrder);

    return [newOrder, null];
  } catch (error) {
    console.error("Error al agregar el pedido:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateOrderService(id, body) {
  try {
    const orderRepository = AppDataSource.getRepository(Order);

    const orderFound = await orderRepository.findOne({ where: { id } });

    if (!orderFound) return [null, "Pedido no encontrado"];

    const dataOrderUpdate = { ...body };

    await orderRepository.update(id, dataOrderUpdate);

    const orderData = await orderRepository.findOne({ where: { id } });

    return [orderData, null];
  } catch (error) {
    console.error("Error al modificar el pedido:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteOrderService(id) {
  try {
    const orderRepository = AppDataSource.getRepository(Order);

    const orderFound = await orderRepository.findOne({ where: { id } });

    if (!orderFound) return [null, "Pedido no encontrado"];

    await orderRepository.remove(orderFound);

    return [orderFound, null];
  } catch (error) {
    console.error("Error al eliminar el pedido:", error);
    return [null, "Error interno del servidor"];
  }
}
