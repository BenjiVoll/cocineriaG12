import HistorialAsistenciaSchema from "../entity/historial.entity.js";
import { AppDataSource } from "../config/configDb.js";


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


export const createHistorialAsistencia = async (personalId, estado) => {
    try {
        const historialRepository = AppDataSource.getRepository(HistorialAsistenciaSchema);
        const nuevoHistorial = historialRepository.create({
            personal: { id: personalId },
            estado,
            fecha: new Date(),
            justificativo: estado === "Ausente justificado" ? "Pendiente" : null 
        });
        await historialRepository.save(nuevoHistorial);
        console.log('Historial guardado con éxito.');
    } catch (error) {
        console.error('Error al guardar el historial de asistencias:', error);
        throw new Error('Error al guardar el historial de asistencias');
    }
};
