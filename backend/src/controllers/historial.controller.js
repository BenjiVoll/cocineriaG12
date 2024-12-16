import HistorialAsistenciaSchema from "../entity/historial.entity.js";
import { AppDataSource } from "../config/configDb.js";

// Obtener historial de asistencias
export const getHistorialAsistencias = async (req, res) => {
    try {
        const historialRepository = AppDataSource.getRepository(HistorialAsistenciaSchema);
        const historial = await historialRepository.find({ relations: ['personal'] });
        res.json(historial);
    } catch (error) {
        console.error('Error al obtener el historial de asistencias:', error);
        res.status(500).json({ message: 'Error al obtener el historial de asistencias', error });
    }
};
