"use strict";
import { DataSource } from "typeorm";
import { DATABASE, DB_USERNAME, HOST, PASSWORD } from '../configEnv.js';

export const AppDataSource = new DataSource({
    type: "postgres", // tipo de base de datos
    host: `${HOST}`,
    port: 5432,
    username: `${DB_USERNAME}`,
    password: `${PASSWORD}`,
    database: `${DATABASE}`,
    entities: ["src/entity/**/*.js"], // Cambia la ruta si es necesario
    synchronize: true,
    logging: false,
});

export async function connectDB() {
    try {
        await AppDataSource.initialize();
        console.log("=> Conexión a la base de datos exitosa");
    } catch (error) {
        console.error("Error al conectarse a la base de datos", error);
    }
}
