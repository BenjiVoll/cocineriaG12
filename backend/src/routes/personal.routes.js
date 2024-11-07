<<<<<<< HEAD

import { Router } from "express";
import {
    deleteUser,
    createUser,
    getUser,
    getUsers,
    updateUser
} from '../controllers/personal.controller.js';

const router = Router();

router.post('/', createUser); // POST http://localhost:3001/api/personal/
router.get('/all', getUsers); // GET http://localhost:3001/api/personal/all
router.get('/:id', getUser); // GET http://localhost:3001/api/personal/:id
router.put('/:id', updateUser); // PUT http://localhost:3001/api/personal/:id
router.delete('/:id', deleteUser); // DELETE http://localhost:3001/api/personal/:id
=======
import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser
} from "../controllers/personal.controller.js";

const router = Router();

router.post("/", createUser); // POST http://localhost:3001/api/user/
router.get("/all", getUsers); // GET http://localhost:3001/api/user/all
router.get("/:id", getUser); // GET http://localhost:3001/api/user/:id
router.put("/:id", updateUser); // PUT http://localhost:3001/api/user/:id
router.delete("/:id", deleteUser); // DELETE http://localhost:3001/api/user/:id
>>>>>>> rama_cocina_3

export default router;
