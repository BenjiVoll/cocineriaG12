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
            length: 100, // Restringir a 100 caracteres
            nullable: false,
        },
        telefono: {
            type: "varchar",
            length: 9, // Restringir a 9 caracteres
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
    },
    checks: [
        { expression: "char_length(\"telefono\") = 9", name: "check_telefono_length" },
        { expression: "\"telefono\" ~ '^9[0-9]{8}$'", name: "check_telefono_format" }, 
        { expression: "char_length(\"nombreCompleto\") <= 100", name: "check_nombre_length" }, 
        { expression: "\"fechaIncorporacion\" >= '2024-01-01' AND \"fechaIncorporacion\" <= '2025-12-31'", name: "check_fechaIncorporacion_range" }, 
        { expression: "\"cargo\" IN ('cocinero', 'administrador', 'mesero')", name: "check_cargo_values" } 
    ]
});

export default PersonalSchema;

