import { Router } from "express";
import { marcarAsistencia, getAsistencias, actualizarEstadoAsistencia, subirJustificativo } from "../controllers/asistencia.controller.js";
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' }); 


router.post('/', marcarAsistencia);


router.get('/', getAsistencias);


router.put('/personal/:personalId/asistencia', actualizarEstadoAsistencia);


router.post('/:personalId/:asistenciaId/justificativo', upload.single('justificativo'), subirJustificativo);

export default router;
