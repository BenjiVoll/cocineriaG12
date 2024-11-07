"use strict";
import { Router } from "express";
<<<<<<< HEAD
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { 
    createIngredienteController,
    deleteIngredienteController,
    getIngredienteController,
    getIngredientesController,
    updateIngredienteController,
} from "../controllers/ingrediente.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router
  .post("/", createIngredienteController)
  .put("/update/:id", updateIngredienteController)
  .get("/search/:id", getIngredientesController)
  .get("/", getIngredienteController)
  .delete("/delete/:id", deleteIngredienteController);

export default router;
=======
import { actualizarIngredienteController, 
    crearIngredienteController, 
    obtenerIngredientesController } from "../controllers/ingrediente.controller.js";

const router = Router();

router.post("/ingredientes", crearIngredienteController);
router.put("/ingredientes/:id", actualizarIngredienteController);
router.get("/ingredientes", obtenerIngredientesController);

export default router;

>>>>>>> rama_cocina_3
