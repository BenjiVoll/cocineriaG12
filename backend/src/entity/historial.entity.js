// entity/historial.entity.js
"use strict";
import { EntitySchema } from "typeorm";

const HistorialAsistenciaSchema = new EntitySchema({
    name: "HistorialAsistencia",
    tableName: "historial_asistencias",
    columns: { 
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        estado: {
            type: "varchar",
            length: 50,
            nullable: false, //'Presente', 'Ausente', 'Justificado'
        },
        justificativo: {
            type: "text",
            nullable: true, 
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

export default HistorialAsistenciaSchema;
