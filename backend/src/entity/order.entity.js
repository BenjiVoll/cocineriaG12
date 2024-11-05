"use strict";
import { EntitySchema } from "typeorm";

const OrderSchema = new EntitySchema({
  name: "Order",
  tableName: "orders",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    productos: {
      type: "json",
      nullable: false,
      comment: "Lista de productos y cantidades en formato JSON",
    },
    precioTotal: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
      comment: "Precio total del pedido",
    },
    estado: {
      type: "varchar",
      length: 50,
      nullable: false,
      default: "pendiente",
      comment: "Estado del pedido: pendiente, en proceso, completado, cancelado",
    },
    metodoPago: {
      type: "varchar",
      length: 50,
      nullable: true,
      comment: "Método de pago utilizado por el cliente",
    },
    fechaEntrega: {
      type: "timestamp with time zone",
      nullable: true,
      comment: "Fecha de entrega estimada o confirmada",
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
      name: "IDX_ORDER_ID",
      columns: ["id"],
      unique: true,
    },
    {
      name: "IDX_ORDER_ESTADO",
      columns: ["estado"],
    },
  ],
});

export default OrderSchema;
