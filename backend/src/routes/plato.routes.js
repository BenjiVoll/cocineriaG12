"use strict";
import { Router } from "express";
import { crearPlatoController, 
    actualizarPlatoController, 
    obtenerPlatosDisponiblesController } from "../controllers/platoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/platos", authMiddleware, crearPlatoController);
router.put("/platos/:id", authMiddleware, actualizarPlatoController);
router.get("/platos/disponibles", authMiddleware, obtenerPlatosDisponiblesController);

export default router;