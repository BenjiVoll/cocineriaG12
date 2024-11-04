import { Router } from "express";
import userRoutes from './user.routes.js';
import asistenciaRoutes from './asistencia.routes.js'; // Importa las rutas de asistencia

const router = Router();

router.use('/user', userRoutes);
router.use('/asistencia', asistenciaRoutes); // Agrega la ruta de asistencia

export default router;
