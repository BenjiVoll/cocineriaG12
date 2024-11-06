"use strict";
import { Router } from "express";
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

export default router;