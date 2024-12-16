import { AppDataSource } from "../config/configDb.js";
import Personal from "../entity/personal.entity.js";

export const personalService = {
    createPersonal: async (data) => {
        const newPersonal = AppDataSource.getRepository(Personal).create(data);
        return await AppDataSource.getRepository(Personal).save(newPersonal);
    },
    getAllPersonals: async () => {
        return await AppDataSource.getRepository(Personal).find();
    },
    getPersonalById: async (id) => {
        return await AppDataSource.getRepository(Personal).findOneBy({ id: parseInt(id, 10) });
    },
    getPersonalByPhone: async (telefono) => {
        return await AppDataSource.getRepository(Personal).findOneBy({ telefono });
    },
    updatePersonal: async (id, updates) => {
        const personal = await AppDataSource.getRepository(Personal).findOneBy({ id: parseInt(id, 10) });
        if (!personal) {
            throw new Error("Personal no encontrado");
        }
        Object.assign(personal, updates);
        return await AppDataSource.getRepository(Personal).save(personal);
    },
    deletePersonal: async (id) => {
        const personal = await AppDataSource.getRepository(Personal).findOneBy({ id: parseInt(id, 10) });
        if (!personal) {
            throw new Error("Personal no encontrado");
        }
        return await AppDataSource.getRepository(Personal).remove(personal);
    },
    getAllPersonalsWithLastAsistencia: async () => {
        return await AppDataSource.getRepository(Personal)
            .createQueryBuilder("personal")
            .leftJoinAndSelect(
                "personal.asistencias", 
                "asistencia", 
                "asistencia.id = (SELECT MAX(a.id) FROM asistencias a WHERE a.personalId = personal.id)"
            )
            .getMany();
    }
};
