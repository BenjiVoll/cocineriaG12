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
  relations: {
    platos: {
      target: "Plato",
      type: "many-to-many",
      inverseSide: "ingredientes",
      joinTable: {
        name: "plato_ingrediente",
        joinColumn: {
          name: "ingrediente_id",
          referencedColumnName: "id",
        },
        inverseJoinColumn: {
          name: "plato_id",
          referencedColumnName: "id",
        },
      },
    },
  },
});

export default IngredienteSchema;
