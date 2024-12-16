import AsistenciaSchema from "../entity/asistencia.entity.js";
import { AppDataSource } from "../config/configDb.js";
import Personal from "../entity/personal.entity.js";
import fs from 'fs';
import path from 'path';


export const marcarAsistencia = async (req, res) => {
    const { personalId, estado } = req.body;

    console.log('Payload recibido:', req.body);

    const estadosValidos = ['Presente', 'Ausente', 'Ausente justificado'];

    try {
     
        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({ message: "El estado debe ser 'Presente', 'Ausente' o 'Ausente justificado'." });
        }

       
        const parsedPersonalId = parseInt(personalId, 10);
        console.log('Parsed Personal ID:', parsedPersonalId);

       
        const personal = await AppDataSource.getRepository(Personal).findOneBy({ id: parsedPersonalId });
        console.log('Personal encontrado:', personal);
        if (!personal) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

      
        const asistenciaRepository = AppDataSource.getRepository(AsistenciaSchema);
        const nuevaAsistencia = asistenciaRepository.create({
            personal: { id: parsedPersonalId },
            estado,
            justificativo: estado === "Ausente justificado" ? "Pendiente" : null 
        });
        console.log('Nueva asistencia creada:', nuevaAsistencia);

        
        await asistenciaRepository.save(nuevaAsistencia);

        res.status(201).json({ message: "Asistencia registrada con éxito", asistencia: nuevaAsistencia });
    } catch (error) {
        console.error('Error al registrar asistencia:', error);
        res.status(500).json({ message: "Error al registrar la asistencia", error });
    }
};


export const subirJustificativo = async (req, res) => {
    const { personalId, asistenciaId } = req.params;
    const file = req.file;

    console.log('Subida de justificativo recibida:');
    console.log(`personalId: ${personalId}`);
    console.log(`asistenciaId: ${asistenciaId}`);
    console.log(`file: ${file}`);

    if (!file) {
        return res.status(400).json({ message: "Se requiere un archivo PDF para justificar la ausencia." });
    }

    try {
        const asistenciaRepository = AppDataSource.getRepository(AsistenciaSchema);
        const asistencia = await asistenciaRepository.findOneBy({ id: parseInt(asistenciaId, 10) });

        if (!asistencia) {
            return res.status(404).json({ message: "Asistencia no encontrada" });
        }

        asistencia.justificativo = file.path; // Guardar la ruta del archivo PDF

        await asistenciaRepository.save(asistencia);

        res.status(200).json({ message: "Justificativo subido con éxito", asistencia });
    } catch (error) {
        console.error('Error al subir justificativo:', error);
        res.status(500).json({ message: "Error al subir justificativo", error });
    }
};


export const actualizarEstadoAsistencia = async (req, res) => {
    const { personalId } = req.params;
    const { estado } = req.body;

    console.log('Payload recibido para actualizar estado:', req.body);

    try {
        
        const personal = await AppDataSource.getRepository(Personal).findOneBy({ id: parseInt(personalId, 10) });
        if (!personal) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        
        personal.asistencia = estado;
        await AppDataSource.getRepository(Personal).save(personal);

        res.status(200).json({ message: "Estado de asistencia actualizado con éxito", personal });
    } catch (error) {
        console.error('Error al actualizar estado de asistencia:', error);
        res.status(500).json({ message: "Error al actualizar el estado de asistencia", error });
    }
};


export const getAsistencias = async (req, res) => {
    try {
        const asistenciaRepository = AppDataSource.getRepository(AsistenciaSchema);
        const asistencias = await asistenciaRepository.find({ relations: ['personal'] });
        res.json(asistencias);
    } catch (error) {
        console.error('Error al obtener las asistencias:', error);
        res.status(500).json({ message: 'Error al obtener las asistencias', error });
    }
};

export default { marcarAsistencia, actualizarEstadoAsistencia, getAsistencias, subirJustificativo };
