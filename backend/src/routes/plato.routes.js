"use strict";
import { Router } from "express";
import { crearPlatoController, 
    actualizarPlatoController, 
    obtenerPlatosDisponiblesController } from "../controllers/plato.controller.js";

const router = Router();

router.post("/platos",  crearPlatoController);
router.put("/platos/:id", actualizarPlatoController);
router.get("/platos/disponibles", obtenerPlatosDisponiblesController);

export default router;