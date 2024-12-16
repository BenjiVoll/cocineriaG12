import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser
} from "../controllers/personal.controller.js";

// Temporalmente omitir el middleware de autenticación y autorización
// import { authenticateJwt } from '../middlewares/authentication.middleware.js';
// import { isAdmin } from '../middlewares/authorization.middleware.js';

const router = Router();

// router.use(authenticateJwt);
// router.use(isAdmin);

router.post("/", createUser); 
router.get("/", getUsers); 
router.get("/:id", getUser); 
router.put("/:id", updateUser); 
router.delete("/:id", deleteUser); 

export default router;
