"use strict";
import Order from "../entity/order.entity.js";
import { AppDataSource } from "./configDb.js";

async function createOrders() {
  try {
    const orderRepository = AppDataSource.getRepository(Order);

    const count = await orderRepository.count();
    if (count > 0) return; // Si ya hay órdenes, no crear más

    // Define un array con las órdenes que deseas crear
    const ordersToCreate = [
      {
        productos: "Producto A", // Solo el nombre del producto como string
        precioTotal: 150.00,
        estado: "pendiente",
        metodoPago: "tarjeta de crédito",
        fechaEntrega: new Date("2024-01-20"),
      },
      {
        productos: "Producto B", // Solo el nombre del producto como string
        precioTotal: 250.00,
        estado: "en proceso",
        metodoPago: "PayPal",
        fechaEntrega: new Date("2024-02-15"),
      },
      {
        productos: "Producto C", // Solo el nombre del producto como string
        precioTotal: 100.00,
        estado: "completado",
        metodoPago: "transferencia bancaria",
        fechaEntrega: new Date("2024-03-10"),
      },
      {
        productos: "Producto D", // Solo el nombre del producto como string
        precioTotal: 200.00,
        estado: "pendiente",
        metodoPago: "tarjeta de débito",
        fechaEntrega: new Date("2024-03-25"),
      },
      {
        productos: "Producto E", // Solo el nombre del producto como string
        precioTotal: 50.00,
        estado: "cancelado",
        metodoPago: "efectivo",
        fechaEntrega: new Date("2024-04-05"),
      },
    ];

    // Guardar todas las órdenes
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
