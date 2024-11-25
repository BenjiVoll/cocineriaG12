import { Router } from "express";
import { isAdmin} from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser
} from "../controllers/personal.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router.post("/", createUser); // POST http://localhost:3001/api/user/
router.get("/", getUsers); // GET http://localhost:3001/api/user/all
router.get("/:id", getUser); // GET http://localhost:3001/api/user/:id
router.put("/:id", updateUser); // PUT http://localhost:3001/api/user/:id
router.delete("/:id", deleteUser); // DELETE http://localhost:3001/api/user/:id

export default router;
