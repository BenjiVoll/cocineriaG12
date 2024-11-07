"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import platoRoutes from "./plato.routes.js";
import ingredienteRoutes from "./ingrediente.routes.js";
import personalRoutes from "./personal.routes.js";
import asistenciaRoutes from "./asistencia.routes.js";
import orderRoutes from "./order.routes.js";


const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/plato", platoRoutes)
    .use("/ingrediente", ingredienteRoutes)
    .use("/personal", personalRoutes)
    .use("/asistencia", asistenciaRoutes) 
    .use("/order", orderRoutes)
    .use("/api/platos", platoRoutes)
    .use("/api/ingredientes", ingredienteRoutes);

export default router;
