"use strict";
import { EntitySchema } from "typeorm";

const PlatoIngredienteSchema = new EntitySchema({
  name: "PlatoIngrediente",
  tableName: "plato_ingredientes",
  columns: {
    platoId: {
      type: "int",
      primary: true, // Configura como parte de la clave primaria
    },
    ingredienteId: {
      type: "int",
      primary: true, // Configura como parte de la clave primaria
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
    plato: {
      target: "Plato",
      type: "many-to-one",
      joinColumn: {
        name: "platoId",
        referencedColumnName: "id",
      },
      nullable: false,
      cascade: true,
    },
    ingrediente: {
      target: "Ingrediente",
      type: "many-to-one",
      joinColumn: {
        name: "ingredienteId",
        referencedColumnName: "id",
      },
      nullable: false,
      cascade: true,
    },
  },
});

export default PlatoIngredienteSchema;
