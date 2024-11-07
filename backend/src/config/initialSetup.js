"use strict";
import User from "../entity/user.entity.js";
import Ingrediente from "../entity/ingrediente.entity.js";
import Plato from "../entity/plato.entity.js";
import { AppDataSource } from "./configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";
import { createOrders } from "./createOrders.js";

async function createInitialData() {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const ingredienteRepository = AppDataSource.getRepository(Ingrediente);
    const platoRepository = AppDataSource.getRepository(Plato);
    

    // Crear usuarios iniciales
    const userCount = await userRepository.count();
    if (userCount === 0) {
      await Promise.all([
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Diego Alexis Salazar Jara",
            rut: "21.308.770-3",
            email: "administrador2024@gmail.cl",
            password: await encryptPassword("admin1234"),
            rol: "administrador",
          })
        ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Diego Sebastián Ampuero Belmar",
            rut: "21.151.897-9",
            email: "usuario1.2024@gmail.cl",
            password: await encryptPassword("user1234"),
            rol: "usuario",
          })
        ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Alexander Benjamín Marcelo Carrasco Fuentes",
            rut: "20.630.735-8",
            email: "usuario2.2024@gmail.cl",
            password: await encryptPassword("user1234"),
            rol: "usuario",
          })
        ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Pablo Andrés Castillo Fernández",
            rut: "20.738.450-K",
            email: "usuario3.2024@gmail.cl",
            password: await encryptPassword("user1234"),
            rol: "usuario",
          })
        ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Felipe Andrés Henríquez Zapata",
            rut: "20.976.635-3",
            email: "usuario4.2024@gmail.cl",
            password: await encryptPassword("user1234"),
            rol: "usuario",
          })
        ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Diego Alexis Meza Ortega",
            rut: "21.172.447-1",
            email: "usuario5.2024@gmail.cl",
            password: await encryptPassword("user1234"),
            rol: "usuario",
          })
        ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Juan Pablo Rosas Martin",
            rut: "20.738.415-1",
            email: "usuario6.2024@gmail.cl",
            password: await encryptPassword("user1234"),
            rol: "usuario",
          })
        ),
      ]);
      console.log("* => Usuarios creados exitosamente");
    }

    // Crear ingredientes iniciales
    const ingredienteCount = await ingredienteRepository.count();
    if (ingredienteCount === 0) {
      const ingredientes = [
        { nombre: "Tomate", cantidad: 100 },
        { nombre: "Lechuga", cantidad: 50 },
        { nombre: "Queso", cantidad: 200 },
        { nombre: "Pan", cantidad: 150 },
        { nombre: "Carne", cantidad: 100 },
      ];

      await Promise.all(
        ingredientes.map(ing => ingredienteRepository.save(ingredienteRepository.create(ing)))
      );
      console.log("* => Ingredientes creados exitosamente");
    }

    // Crear platos iniciales
    const platoCount = await platoRepository.count();
    if (platoCount === 0) {
      const platos = [
        {
          nombre: "Hamburguesa",
          descripcion: "Hamburguesa con queso, tomate y lechuga",
          precio: 5000,
          disponible: ["Tomate", "Lechuga", "Queso", "Pan", "Carne"].every(nombre => 
            ingredientes.some(ing => ing.nombre === nombre && ing.cantidad > 0)
          ),
          ingredientes: ingredientes.filter(ing => ["Tomate", "Lechuga", "Queso", "Pan", "Carne"].includes(ing.nombre)),
        },
        {
          nombre: "Ensalada",
          descripcion: "Ensalada fresca con tomate y lechuga",
          precio: 4500,
          disponible: ["Tomate", "Lechuga"].every(nombre => 
            ingredientes.some(ing => ing.nombre === nombre && ing.cantidad > 0)
          ),
          ingredientes: ingredientes.filter(ing => ["Tomate", "Lechuga"].includes(ing.nombre)),
        },
      ];      

      for (const platoData of platos) {
        const plato = platoRepository.create({
          nombre: platoData.nombre,
          descripcion: platoData.descripcion,
          precio: platoData.precio,
          disponible: platoData.disponible,
        });
        await platoRepository.save(plato);

        // Asignar ingredientes al plato
        for (const ingredienteId of platoData.ingredientes) {
          const ingrediente = await ingredienteRepository.findOneBy({ id: ingredienteId });
        }
      }
      console.log("* => Platos creados exitosamente");
    }
    // Crear órdenes iniciales
    await createOrders();

  } catch (error) {
    console.error("Error al crear datos iniciales:", error);
  }
}

export { createInitialData };