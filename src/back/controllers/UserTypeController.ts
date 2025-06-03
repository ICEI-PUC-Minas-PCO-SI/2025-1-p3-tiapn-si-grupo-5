import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export class UserTypeController {
    async getAllUserTypes(req: Request, res: Response) {
        try {
            const userTypes = await prisma.tipousuario.findMany();
            res.json(userTypes);
        } catch (error) {
            console.error("Erro ao buscar tipos de usuário:", error);
            res.status(500).json({ error: "Erro ao buscar tipos de usuário" });
        }
    }
}