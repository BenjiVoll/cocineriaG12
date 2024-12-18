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
        estado: "pendiente",
        precioTotal: 3490,        
        metodoPago: "tarjeta de crédito",
      },
      {
        productos: "Ensalada",
        precioTotal: 3890,
        estado: "en proceso",
        metodoPago: "PayPal",
      },
      {
        productos: "Ensalada Cesar",
        precioTotal: 4490.00,
        estado: "completado",
        metodoPago: "transferencia bancaria",
      },
      {
        productos: "Papas fritas",
        precioTotal: 2190.00,
        estado: "pendiente",
        metodoPago: "tarjeta de débito",
      },
      {
        productos: "Jugo Natural",
        precioTotal: 1490.00,
        estado: "pendiente",
        metodoPago: "efectivo",
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
