"use strict";
import { Router } from "express";
import {
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/order.controller.js";

const router = Router();


router
  .get("/orders/", getOrders)           // Obtener todos los pedidos
  .get("/orders/detail/", getOrder)      // Obtener un pedido específico
  .patch("/orders/detail/", updateOrder) // Actualizar un pedido
  .delete("/orders/detail/", deleteOrder); // Eliminar un pedido

export default router;
