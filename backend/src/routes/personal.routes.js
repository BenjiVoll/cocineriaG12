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

router.post("/", createUser); // POST http://localhost:3001/api/personal/
router.get("/", getUsers); // GET http://localhost:3001/api/personal/
router.get("/:id", getUser); // GET http://localhost:3001/api/personal/:id
router.put("/:id", updateUser); // PUT http://localhost:3001/api/personal/:id
router.delete("/:id", deleteUser); // DELETE http://localhost:3001/api/personal/:id

export default router;
