// asistencia.routes.js
import { Router } from 'express';
import { marcarAsistencia } from '../controllers/asistencia.controller.js';

const router = Router();

router.post('/marcar', marcarAsistencia);

export default router;
