"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js"
import platoRoutes from "./platoRoutes.js";
import ingredienteRoutes from "./ingredienteRoutes.js";;


const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    use("/api/platos", platoRoutes);
    use("/api/ingredientes", ingredienteRoutes);

export default router;