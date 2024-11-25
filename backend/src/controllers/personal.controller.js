"use strict";
import User_personal from '../entity/personal.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createUser(req, res) {
    try {
        const userRepository = AppDataSource.getRepository(User_personal);
        const user = req.body;

        if (!user) {
            return res.status(400).json({
                message: "Es necesario ingresar los datos del personal.",
                data: null
            });
        }

      
        const validCargos = ['cocinero', 'administrador', 'garzon'];
        if (!validCargos.includes(user.cargo.toLowerCase())) {
            return res.status(400).json({
                message: "El cargo debe ser uno de los siguientes: 'cocinero', 'administrador', 'garzon'.",
                data: null
            });
        }

        
        const telefonoRegex = /^[0-9]{9}$/; // Solo acepta 9 dígitos numéricos
        if (!telefonoRegex.test(user.telefono)) {
            return res.status(400).json({
                message: "teléfono debe contener solo 9 dígitos numéricos.",
                data: null
            });
        }

        const newUser = userRepository.create({
            nombreCompleto: user.nombreCompleto,
            telefono: user.telefono,
            fechaIncorporacion: user.fechaIncorporacion,
            cargo: user.cargo
        });

        const userSaved = await userRepository.save(newUser);

        res.status(201).json({
            message: "Usuario creado exitosamente",
            data: userSaved
        });
    } catch (error) {
        console.error("Error al crear un usuario, el error es: ", error);
        res.status(500).json({
            message: "Error al crear el usuario",
            error: error.message
        });
    }
}

export async function getUser(req, res) {
    try {
        const userRepository = AppDataSource.getRepository(User_personal);
        const id = req.params.id;

        const userFound = await userRepository.findOne({
            where: {
                id: id
            }
        });

        if (!userFound) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
        }

        res.status(200).json({
            message: "Usuario encontrado",
            data: userFound
        });

    } catch (error) {
        console.error('Error al obtener un usuario, el error: ', error);
        res.status(500).json({
            message: "Error al obtener el usuario",
            error: error.message
        });
    }
}

export async function getUsers(req, res) {
    try {
        const userRepository = AppDataSource.getRepository(User_personal);
        const users = await userRepository.find();

        if (users.length === 0) {
            return res.status(404).json({
                message: "No se encontraron usuarios.",
                data: null
            });
        }

        res.status(200).json({
            message: "Usuarios encontrados.",
            data: users
        });
    } catch (error) {
        console.error('Error al obtener usuarios, el error: ', error);
        res.status(500).json({
            message: "Error al obtener los usuarios.",
            error: error.message
        });
    }
}

export async function updateUser(req, res) {
    try {
        const id = req.params.id; 
        const { nombreCompleto, telefono, fechaIncorporacion, cargo } = req.body;

        const userRepository = AppDataSource.getRepository(User_personal);
        const user = await userRepository.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
        }

        
        const validCargos = ['cocinero', 'administrador', 'garzon'];
        if (cargo && !validCargos.includes(cargo.toLowerCase())) {
            return res.status(400).json({
                message: "El cargo debe ser uno de los siguientes: 'cocinero', 'administrador', 'garzon'.",
                data: null
            });
        }

        
        const telefonoRegex = /^[0-9]{9}$/; // Solo acepta 9 dígitos numéricos
        if (telefono && !telefonoRegex.test(telefono)) {
            return res.status(400).json({
                message: "El número de teléfono debe contener solo 9 dígitos numéricos.",
                data: null
            });
        }

        
        user.nombreCompleto = nombreCompleto;
        user.telefono = telefono;
        user.fechaIncorporacion = fechaIncorporacion;
        user.cargo = cargo;

        const userUpdated = await userRepository.save(user);

        res.status(200).json({
            message: "Usuario modificado correctamente",
            data: userUpdated
        });
    } catch (error) {
        console.error("Error al modificar el usuario: ", error);
        res.status(500).json({
            message: "Error al modificar el usuario",
            error: error.message
        });
    }
}

export async function deleteUser(req, res) {
    try {
        const id = req.params.id; 

        const userRepository = AppDataSource.getRepository(User_personal);
        const user = await userRepository.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
        }

        await userRepository.remove(user); 
        res.status(200).json({
            message: "Usuario eliminado correctamente",
            data: user
        });
    } catch (error) {
        console.error("Error al eliminar el usuario: ", error);
        res.status(500).json({
            message: "Error al eliminar el usuario",
            error: error.message
        });
    }
}
