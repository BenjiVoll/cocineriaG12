"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
<<<<<<< HEAD
import authRoutes from "./auth.routes.js";
import platoRoutes from "./plato.routes.js";
import ingredienteRoutes from "./ingrediente.routes.js";
import personalRoutes from "./personal.routes.js";
import asistenciaRoutes from "./asistencia.routes.js";
=======
import authRoutes from "./auth.routes.js"
import platoRoutes from "./plato.routes.js";
import orderRoutes from "./order.routes.js";
import ingredienteRoutes from "./ingrediente.routes.js";
>>>>>>> rama_cocina_3


const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
<<<<<<< HEAD
    .use("/plato", platoRoutes)
    .use("/ingrediente", ingredienteRoutes)
    .use("/personal", personalRoutes)
    .use("/asistencia", asistenciaRoutes); 
=======
    .use("/order", orderRoutes)
    .use("/api/platos", platoRoutes)
    .use("/api/ingredientes", ingredienteRoutes);
>>>>>>> rama_cocina_3

export default router;
