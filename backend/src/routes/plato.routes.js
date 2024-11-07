"use strict";
import { Router } from "express";
<<<<<<< HEAD
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    createPlatoController,
    updatePlatoController,
    getPlatoController,
    getPlatosController,
    deletePlatoController,
} from "../controllers/plato.controller.js";

const router = Router();
router
  .use(authenticateJwt)
  .use(isAdmin);

router
  .post("/",  createPlatoController)
  .put("/update/:id", updatePlatoController)
  .get("/search/:id", getPlatosController)
  .get("/", getPlatoController)
  .delete("/delete/:id", deletePlatoController);
=======
import { actualizarPlatoController, 
    crearPlatoController, 
    obtenerPlatosDisponiblesController } from "../controllers/plato.controller.js";

const router = Router();

router.post("/platos",  crearPlatoController);
router.put("/platos/:id", actualizarPlatoController);
router.get("/platos/disponibles", obtenerPlatosDisponiblesController);
>>>>>>> rama_cocina_3

export default router;