"use strict";

import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/configDB.js'; // Asegúrate de que la ruta sea correcta
import indexRoutes from './routes/index.routes.js'; // Asegúrate de que la ruta sea correcta

// Cargar las variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // O cualquier puerto que necesites
const HOST = process.env.HOST || 'localhost'; // O cualquier host que necesites

// Imprimir las variables de entorno para depuración
console.log("Variables de entorno:");
console.log(`HOST: ${HOST}`);
console.log(`DATABASE: ${process.env.DATABASE}`);
console.log(`DB_USERNAME: ${process.env.DB_USERNAME}`);
console.log(`PASSWORD: ${process.env.PASSWORD}`);

app.use(express.json()); // Middleware para parsear JSON
app.use('/api', indexRoutes); // Ruta para las APIs principales


async function setupAPI() {
    await connectDB(); // Conectar a la base de datos
    // Otras configuraciones de la API pueden ir aquí
}

setupAPI()
    .then(() => {
        console.log("=> API iniciada exitosamente");
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al iniciar la API", error);
    });
