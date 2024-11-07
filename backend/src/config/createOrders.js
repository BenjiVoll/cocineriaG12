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
        productos: [
          { productoId: 1, nombre: "Producto A", cantidad: 1, precioUnitario: 150.00 }
        ],
        precioTotal: 150.00,
        estado: "pendiente",
        metodoPago: "tarjeta de crédito",
        fechaEntrega: new Date("2024-01-20"),
      },
      {
        productos: [
          { productoId: 2, nombre: "Producto B", cantidad: 1, precioUnitario: 250.00 }
        ],
        precioTotal: 250.00,
        estado: "en proceso",
        metodoPago: "PayPal",
        fechaEntrega: new Date("2024-02-15"),
      },
      {
        productos: [
          { productoId: 3, nombre: "Producto C", cantidad: 1, precioUnitario: 100.00 }
        ],
        precioTotal: 100.00,
        estado: "completado",
        metodoPago: "transferencia bancaria",
        fechaEntrega: new Date("2024-03-10"),
      },
      {
        productos: [
          { productoId: 4, nombre: "Producto D", cantidad: 1, precioUnitario: 200.00 }
        ],
        precioTotal: 200.00,
        estado: "pendiente",
        metodoPago: "tarjeta de débito",
        fechaEntrega: new Date("2024-03-25"),
      },
      {
        productos: [
          { productoId: 5, nombre: "Producto E", cantidad: 1, precioUnitario: 50.00 }
        ],
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
