import { Router } from "express";
import { getUsuarios } from "../controllers/usuarioController";

const router = Router();

router.get("/", getUsuarios);

export default router;