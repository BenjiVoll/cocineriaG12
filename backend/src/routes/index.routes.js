"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js"
import platoRoutes from "./plato.routes.js";
import ingredienteRoutes from "./ingrediente.routes.js";;


const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/api/platos", platoRoutes)
    .use("/api/ingredientes", ingredienteRoutes);

export default router;