"use strict";
import Personal from '../entity/personal.entity.js';
import { AppDataSource } from '../config/configDb.js';

const personalRepository = AppDataSource.getRepository(Personal);

export const personalService = {
    async createPersonal(data) {
        console.log("Datos recibidos en backend para creación:", data); // Añadir log detallado

        if (!data.fechaIncorporacion) {
            throw new Error("La fecha de incorporación es requerida.");
        }

        const newPersonal = personalRepository.create(data);
        console.log("Nuevo personal creado:", newPersonal); // Log adicional
        return await personalRepository.save(newPersonal);
    },

    async getPersonalById(id) {
        const personal = await personalRepository.findOne({ where: { id } });
        if (!personal) throw new Error("Personal no encontrado.");
        return personal;
    },

    async getAllPersonals() {
        return await personalRepository.find();
    },

    async updatePersonal(id, updates) {
        const personal = await personalRepository.findOne({ where: { id } });
        if (!personal) throw new Error("Personal no encontrado.");

        console.log("Datos recibidos para actualización en backend:", updates); // Log detallado

        if (!updates.fechaIncorporacion) {
            throw new Error("La fecha de incorporación es requerida.");
        }

        Object.assign(personal, updates);
        console.log("Datos actualizados del personal:", personal); // Log adicional
        return await personalRepository.save(personal);
    },

    async deletePersonal(id) {
        const personal = await personalRepository.findOne({ where: { id } });
        if (!personal) throw new Error("Personal no encontrado.");
        await personalRepository.remove(personal);
        return personal;
    }
};
