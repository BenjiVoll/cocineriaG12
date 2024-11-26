import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import {
    handleErrorClient,
    handleErrorServer,
} from "../handlers/responseHandlers.js";

export async function isAdmin(req, res, next) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOneBy({ email: req.user.email });

        if (!userFound) {
            return handleErrorClient(
                res,
                404,
                "Usuario no encontrado en la base de datos"
            );
        }

        const rolUser = userFound.rol;

        if (rolUser !== "administrador") {
            return handleErrorClient(
                res,
                403,
                "Error al acceder al recurso",
                "Se requiere un rol de administrador para realizar esta acción."
            );
        }
        next();
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function isPersonal(req, res, next) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOneBy({ email: req.user.email });

        if (!userFound) {
            return handleErrorClient(
                res,
                404,
                "Usuario no encontrado en la base de datos"
            );
        }

        const rolUser = userFound.rol;

        if (rolUser !== "personal") {
            return handleErrorClient(
                res,
                403,
                "Error al acceder al recurso",
                "Se requiere un rol de personal para realizar esta acción."
            );
        }
        next();
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function esMesero(req, res, next) {
    try {
      // Obtener el repositorio de usuarios
      const userRepository = AppDataSource.getRepository(User);
  
      // Buscar al usuario por correo en la base de datos
      const userFound = await userRepository.findOneBy({ email: req.user.email });
  
      if (!userFound) {
        return handleErrorClient(
          res,
          404,
          "Usuario no encontrado en la base de datos"
        );
      }
  
      // Verificar si el rol del usuario es "mesero"
      const rolUser = userFound.rol;
  
      if (rolUser !== "mesero") {
        return handleErrorClient(
          res,
          403,
          "Error al acceder al recurso",
          "Se requiere un rol de mesero para realizar esta acción."
        );
      }
  
      // Continuar al siguiente middleware o controlador
      next();
    } catch (error) {
      // Manejo de errores del servidor
      handleErrorServer(res, 500, error.message);
    }
  }