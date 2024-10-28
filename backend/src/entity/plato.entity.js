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
      type: "decimal",
      nullable: false,
    },
    disponible: {
      type: "boolean",
      default: true,
      nullable: false,
    },
  },
});

export default PlatoSchema;