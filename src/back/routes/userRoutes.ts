import express from "express";
import { registerUser } from "../controllers/registerUser";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../services/hashedPassword";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", registerUser);

export default router;