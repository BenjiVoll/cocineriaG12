import { Router } from "express";
import { marcarAsistencia, getAsistencias, actualizarEstadoAsistencia, subirJustificativo } from "../controllers/asistencia.controller.js";
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' }); // Configura multer para almacenar archivos en la carpeta "uploads"

// Ruta para registrar asistencia
router.post('/', marcarAsistencia);

// Ruta para obtener asistencias
router.get('/', getAsistencias);

// Ruta para actualizar estado de asistencia
router.put('/personal/:personalId/asistencia', actualizarEstadoAsistencia);

// Ruta para subir justificativo
router.post('/:personalId/:asistenciaId/justificativo', upload.single('justificativo'), subirJustificativo);

export default router;
