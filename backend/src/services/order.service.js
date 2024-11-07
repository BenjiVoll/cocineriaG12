"use strict";
import Order from "../entity/order.entity.js";
import { AppDataSource } from "../config/configDb.js";

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

export async function addOrderService(orderData) {
  try {
    const orderRepository = AppDataSource.getRepository(Order);

    const newOrder = orderRepository.create(orderData);
    
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

    const dataOrderUpdate = {
      estado: body.estado
    };

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
