"use strict";
import { Router } from "express";
import { crearIngredienteController, 
    actualizarIngredienteController, 
    obtenerIngredientesController } from "../controllers/ingrediente.controller.js";

const router = Router();

router.post("/ingredientes", crearIngredienteController);
router.put("/ingredientes/:id", actualizarIngredienteController);
router.get("/ingredientes", obtenerIngredientesController);

export default router;

