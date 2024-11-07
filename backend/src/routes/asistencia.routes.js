// asistencia.routes.js
<<<<<<< HEAD
import { Router } from 'express';
import { marcarAsistencia } from '../controllers/asistencia.controller.js';
import { getAsistencias } from '../controllers/asistencia.controller.js';

const router = Router();

router.post('/', marcarAsistencia);
router.get('/', getAsistencias);
=======
import { Router } from "express";
import { marcarAsistencia } from "../controllers/asistencia.controller.js";

const router = Router();

router.post("/asistencia", marcarAsistencia);
>>>>>>> rama_cocina_3

export default router;
