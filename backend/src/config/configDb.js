"use strict";
import { DataSource } from "typeorm";
import { DATABASE, DB_USERNAME, HOST, PASSWORD } from "./configEnv.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: `${HOST}`,  // Cambié localhost por la variable de entorno HOST
  port: 5432,  // El puerto de PostgreSQL es 5432 por defecto
  username: `${DB_USERNAME}`,
  password: `${PASSWORD}`,
  database: `${DATABASE}`,
  entities: ["src/entity/**/*.js"],
  synchronize: true,
  logging: false,
});

export async function connectDB() {
  try {
    await AppDataSource.initialize();
    console.log("=> Conexión exitosa a la base de datos!");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
}
