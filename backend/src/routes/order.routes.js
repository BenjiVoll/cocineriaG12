"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/order.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router
  .get("/", getOrders)           // Obtener todos los pedidos
  .get("/detail/", getOrder)      // Obtener un pedido específico
  .patch("/detail/", updateOrder) // Actualizar un pedido
  .delete("/detail/", deleteOrder); // Eliminar un pedido

export default router;
