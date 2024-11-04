// asistencia.controller.js
import AsistenciaSchema from "../entity/asistencia.entity.js";
import { AppDataSource } from "../config/configDB.js";
import User_personal from "../entity/user.entity.personal.js"; 
export const marcarAsistencia = async (req, res) => {
    const { personalId, estado, justificativo } = req.body;

    try {
        // Verificar si el usuario existe
        const personal = await AppDataSource.getRepository(User_personal).findOneBy({ id: personalId });
        if (!personal) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const asistenciaRepository = AppDataSource.getRepository(AsistenciaSchema);
        const nuevaAsistencia = asistenciaRepository.create({
            personal: { id: personalId }, // Referencia al usuario (FK)
            estado,
            justificativo: estado === "ausente_justificado" ? justificativo : null
        });

        await asistenciaRepository.save(nuevaAsistencia);

        res.status(201).json({ message: "Asistencia registrada con éxito", asistencia: nuevaAsistencia });
    } catch (error) {
        console.error(error); // Para depuración
        res.status(500).json({ message: "Error al registrar la asistencia", error });
    }
};
 