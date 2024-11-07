"use strict";
import { EntitySchema } from "typeorm";

const IngredienteSchema = new EntitySchema({
  name: "Ingrediente",
  tableName: "ingredientes",
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
    cantidad: {
      type: "int",
      nullable: false,
      default: 0,
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
      name: "IDX_INGREDIENTE",
      columns: ["id"],
      unique: true,
    },
    {
      name: "IDX_INGREDIENTE_NOMBRE",
      columns: ["nombre"],
      unique: true,
    },
    {
      name: "IDX_INGREDIENTE_CANTIDAD",
      columns: ["cantidad"],
      unique: false,
    }
  ],
  relations: {
    platos: {
      target: "Plato",
      type: "many-to-many",
      inverseSide: "ingredientes",
      joinTable: false, // La tabla de unión se define en `PlatoSchema`
    },
  },
});

export default IngredienteSchema;