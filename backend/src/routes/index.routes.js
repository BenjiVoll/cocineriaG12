"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import personalRoutes from "./personal.routes.js";
import asistenciaRoutes from "./asistencia.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/personal", personalRoutes)
    .use("/asistencia", asistenciaRoutes); 

export default router;
