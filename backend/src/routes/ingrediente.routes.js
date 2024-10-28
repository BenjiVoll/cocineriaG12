"use strict";
import { Router } from "express";
import { crearIngredienteController, 
    actualizarIngredienteController, 
    obtenerIngredientesController } from "../controllers/ingredienteController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/ingredientes", authMiddleware, crearIngredienteController);
router.put("/ingredientes/:id", authMiddleware, actualizarIngredienteController);
router.get("/ingredientes", authMiddleware, obtenerIngredientesController);

export default router;

