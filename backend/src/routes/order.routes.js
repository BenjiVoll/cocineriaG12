"use strict";
import { Router } from "express";
import {
  addOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/order.controller.js";

const router = Router();

router
  .get("/", getOrders)            // Obtener todos los pedidos
  .get("/:id", getOrder)          // Obtener un pedido
  .post("/", addOrder)            // Agregar pedido
  .patch("/:id", updateOrder)     // Actualizar un pedido
  .delete("/:id", deleteOrder);   // Eliminar un pedido

export default router;
