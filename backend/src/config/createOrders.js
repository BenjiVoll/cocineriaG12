"use strict";
import Order from "../entity/order.entity.js";
import { AppDataSource } from "./configDb.js";

async function createOrders() {
  try {
    const orderRepository = AppDataSource.getRepository(Order);

    const count = await orderRepository.count();
    if (count > 0) return;

    await Promise.all([
      orderRepository.save(
        orderRepository.create({
          userId: 1,
          orderDetails: "Pedido de 3 unidades de producto A",
          status: "pendiente",
          totalAmount: 150.00,
          orderDate: new Date("2024-01-15"),
          deliveryDate: new Date("2024-01-20"),
        })
      ),
      orderRepository.save(
        orderRepository.create({
          userId: 2,
          orderDetails: "Pedido de 5 unidades de producto B",
          status: "enviado",
          totalAmount: 250.00,
          orderDate: new Date("2024-02-10"),
          deliveryDate: new Date("2024-02-15"),
        })
      ),
      orderRepository.save(
        orderRepository.create({
          userId: 3,
          orderDetails: "Pedido de 2 unidades de producto C",
          status: "completado",
          totalAmount: 100.00,
          orderDate: new Date("2024-03-05"),
          deliveryDate: new Date("2024-03-10"),
        })
      ),
      orderRepository.save(
        orderRepository.create({
          userId: 4,
          orderDetails: "Pedido de 4 unidades de producto D",
          status: "pendiente",
          totalAmount: 200.00,
          orderDate: new Date("2024-03-20"),
          deliveryDate: new Date("2024-03-25"),
        })
      ),
      orderRepository.save(
        orderRepository.create({
          userId: 5,
          orderDetails: "Pedido de 1 unidad de producto E",
          status: "cancelado",
          totalAmount: 50.00,
          orderDate: new Date("2024-04-01"),
          deliveryDate: new Date("2024-04-05"),
        })
      ),
    ]);

    console.log("* => Pedidos creados exitosamente");
  } catch (error) {
    console.error("Error al crear pedidos:", error);
  }
}

export { createOrders };
