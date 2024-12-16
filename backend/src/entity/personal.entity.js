"use strict";
import { EntitySchema } from "typeorm";

const PersonalSchema = new EntitySchema({
    name: "Personal",
    tableName: "personals",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombreCompleto: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        telefono: {
            type: "varchar",
            length: 9,
            nullable: false,
        },
        fechaIncorporacion: {
            type: "date",
            nullable: true,
        },
        cargo: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        asistencia: {
            type: "varchar",
            nullable: true,
        },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
        updatedAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        }
    },
    relations: {
        asistencias: {
            type: "one-to-many",
            target: "Asistencia",
            inverseSide: "personal",
            eager: true 
        }
    }
});

export default PersonalSchema;

