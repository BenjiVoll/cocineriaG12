"use strict";
import Order from "../entity/order.entity.js";
import { AppDataSource } from "./configDb.js";

async function createOrders() {
  try {
    const orderRepository = AppDataSource.getRepository(Order);

    const count = await orderRepository.count();
    if (count > 0) return;

    
    const ordersToCreate = [
      {
        productos: "Hamburguesa",
        precioTotal: 3490,
        estado: "pendiente",
        metodoPago: "tarjeta de crédito",
        fechaEntrega: new Date("2024-01-20"),
      },
      {
        productos: "Ensalada",
        precioTotal: 3890,
        estado: "en proceso",
        metodoPago: "PayPal",
        fechaEntrega: new Date("2024-02-15"),
      },
      {
        productos: "Ensalada Cesar",
        precioTotal: 4490.00,
        estado: "completado",
        metodoPago: "transferencia bancaria",
        fechaEntrega: new Date("2024-03-10"),
      },
      {
        productos: "Papas fritas",
        precioTotal: 2190.00,
        estado: "pendiente",
        metodoPago: "tarjeta de débito",
        fechaEntrega: new Date("2024-03-25"),
      },
      {
        productos: "Jugo Natural",
        precioTotal: 1490.00,
        estado: "pendiente",
        metodoPago: "efectivo",
        fechaEntrega: new Date("2024-04-05"),
      },
    ];
    
    await Promise.all(ordersToCreate.map(orderData => {
      const order = orderRepository.create(orderData);
      return orderRepository.save(order);
    }));

    console.log("* => Pedidos creados exitosamente");
  } catch (error) {
    console.error("Error al crear pedidos:", error);
  }
}

export { createOrders };
