import AsistenciaSchema from "../entity/asistencia.entity.js";
import { AppDataSource } from "../config/configDb.js";
import Personal from "../entity/user.entity.personal.js"; 

export const marcarAsistencia = async (req, res) => {
    const { personalId, estado, justificativo } = req.body;

    try {
        // Verificar si el usuario existe
        const personal = await AppDataSource.getRepository(Personal).findOneBy({ id: personalId });
        if (!personal) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const asistenciaRepository = AppDataSource.getRepository(AsistenciaSchema);
        const nuevaAsistencia = asistenciaRepository.create({
            personal: { id: personalId }, 
            estado,
            justificativo: estado === "ausente_justificado" ? justificativo : null
        });

        await asistenciaRepository.save(nuevaAsistencia);

        res.status(201).json({ message: "Asistencia registrada con éxito", asistencia: nuevaAsistencia });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Error al registrar la asistencia", error });
    }
};

export const getAsistencias = async (req, res) => {
    try {
        const asistenciaRepository = AppDataSource.getRepository(AsistenciaSchema);
        const asistencias = await asistenciaRepository.find({ relations: ['personal'] }); // Incluye la relación si es necesario
        res.json(asistencias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las asistencias', error });
    }
};
