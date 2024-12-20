"use strict";
import { Router } from "express";
import { esMesero } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  addOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/order.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(esMesero);

router
  .get("/", getOrders)            // Obtener todos los pedidos
  .get("/:id", getOrder)          // Obtener un pedido
  .post("/", addOrder)            // Agregar pedido
  .patch("/update/:id", updateOrder)     // Actualizar un pedido
  .delete("/delete/:id", deleteOrder);   // Eliminar un pedido

export default router;
