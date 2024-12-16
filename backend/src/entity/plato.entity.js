"use strict";
import { EntitySchema } from "typeorm";

const PlatoSchema = new EntitySchema({
  name: "Plato",
  tableName: "platos",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    nombre: {
      type: "varchar",
      length: 255, 
      nullable: false,
    },
    descripcion: {
      type: "text",
      nullable: true,
    },
    precio: {
      type: "int", // Tipo entero
      nullable: false,
      default: 0, // Valor por defecto para evitar problemas con registros existentes
    },
    disponible: {
      type: "boolean",
      default: true,
      nullable: false,
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
    },
  },
  indices: [
    {
      name: "IDX_PLATO",
      columns: ["id"],
      unique: true,
    },
    {
      name: "IDX_PLATO_NOMBRE",
      columns: ["nombre"],
      unique: true,
    },
  ],
  relations: {
    ingredientes: {
      target: "Ingrediente",
      type: "many-to-many",
      inverseSide: "platos",
      joinTable: {
        name: "plato_ingrediente", // Tabla intermedia para la relación
        joinColumn: {
          name: "plato_id",
          referencedColumnName: "id",
        },
        inverseJoinColumn: {
          name: "ingrediente_id",
          referencedColumnName: "id",
        },
      },
      cascade: true,
    },
  },
});

export default PlatoSchema;
