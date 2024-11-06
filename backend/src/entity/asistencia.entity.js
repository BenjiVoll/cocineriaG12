"use strict";
import { EntitySchema } from "typeorm";


const AsistenciaSchema = new EntitySchema({
    name: "Asistencia",
    tableName: "asistencias",
    columns: { 
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
            target: "Personal", 
            joinColumn: {
                name: "personal_id" 
            },
            cascade: true,
            onDelete: "CASCADE"
        }
    }
});

export default AsistenciaSchema;
