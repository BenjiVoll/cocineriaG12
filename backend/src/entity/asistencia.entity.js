"use strict";
import { EntitySchema } from "typeorm";


const AsistenciaSchema = new EntitySchema({
    name: "Asistencia",
    tableName: "asistencias",
    columns: { // Asegúrate de que las columnas estén dentro de la clave `columns`
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        estado: {
            type: "varchar",
            length: 50,
            nullable: false, // Puede ser 'presente', 'ausente_justificado', 'ausente_pendiente'
        },
        justificativo: {
            type: "text",
            nullable: true, // Solo se usa si hay justificación
        },
        fecha: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        }
    },
    relations: {
        personal: {
            type: "many-to-one",
            target: "User_personal", // Asegúrate de que el nombre coincida con el nombre de la entidad `UserSchema`
            joinColumn: {
                name: "personal_id" // Este es el nombre de la columna FK en la tabla `asistencias`
            },
            cascade: true,
            onDelete: "CASCADE"
        }
    }
});

export default AsistenciaSchema;
