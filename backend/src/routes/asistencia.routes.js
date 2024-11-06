// asistencia.routes.js
import { Router } from 'express';
import { marcarAsistencia } from '../controllers/asistencia.controller.js';
import { getAsistencias } from '../controllers/asistencia.controller.js';

const router = Router();

router.post('/', marcarAsistencia);
router.get('/', getAsistencias);

export default router;
