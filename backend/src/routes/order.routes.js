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
  .get("/", getOrders)                   // Obtener todos los pedidos
  .get("/detail/:id", getOrder)          // Obtener un pedido
  .patch("/detail/:id", updateOrder)     // Actualizar un pedido
  .delete("/detail/:id", deleteOrder);   // Eliminar un pedido

export default router;
