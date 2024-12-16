import { personalService } from "../services/personal.service.js";
import { personalBodyValidation, personalQueryValidation } from "../validations/personal.validation.js";

export const createUser = async (req, res) => {
    // Validar el cuerpo de la solicitud
    const { error } = personalBodyValidation.validate(req.body);
    if (error) {
        return res.status(400).json({ errors: error.details });
    }

    try {
        const data = req.body;
        console.log("Datos recibidos en controlador para crear usuario:", data); // Log adicional

        const personal = await personalService.createPersonal(data);
        res.status(201).json({ data: personal });
    } catch (error) {
        console.error("Error al crear el personal:", error);
        res.status(400).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await personalService.getAllPersonals();
        res.status(200).json({ data: users });
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(400).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    // Validar los parámetros de la solicitud
    const { error } = personalQueryValidation.validate(req.query);
    if (error) {
        return res.status(400).json({ errors: error.details });
    }

    try {
        const { id } = req.params;
        const user = await personalService.getPersonalById(id);
        res.status(200).json({ data: user });
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(400).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    // Validar el cuerpo de la solicitud
    const { error } = personalBodyValidation.validate(req.body);
    if (error) {
        return res.status(400).json({ errors: error.details });
    }

    try {
        const { id } = req.params;
        const updates = req.body;
        console.log("Datos recibidos para actualización en controlador:", updates); // Log adicional

        const updatedUser = await personalService.updatePersonal(id, updates);
        res.status(200).json({ data: updatedUser });
    } catch (error) {
        console.error("Error al actualizar el personal:", error);
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await personalService.deletePersonal(id);
        res.status(204).json();
    } catch (error) {
        console.error("Error al eliminar el personal:", error);
        res.status(400).json({ message: error.message });
    }
};

export const getAllPersonals = async (req, res) => {
    try {
        const personals = await personalService.getAllPersonalsWithLastAsistencia();
        res.status(200).json({ data: personals });
    } catch (error) {
        console.error("Error al obtener personal con asistencia:", error);
        res.status(400).json({ message: error.message });
    }
};
