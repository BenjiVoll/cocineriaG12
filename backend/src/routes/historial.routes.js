import { Router } from "express";
import { getHistorialAsistencias } from "../controllers/historial.controller.js";

const router = Router();

router.get('/historialAsistencia', getHistorialAsistencias);

export default router;
