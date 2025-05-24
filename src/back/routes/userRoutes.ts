import express from "express";
import { registerUser } from "../controllers/registerUser";
import { loginUser } from "../controllers/loginUser";
import { getAllUsers } from "../controllers/getAllUsers";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers)

export default router;