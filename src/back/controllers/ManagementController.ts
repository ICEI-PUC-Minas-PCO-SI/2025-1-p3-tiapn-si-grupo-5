import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export class ManagementController {
    async getAllActiveManagement(req: Request, res: Response) {
        try {
            const activeManagements = await prisma.gerencia.findMany({
                where: { ativo: 1 },
            });
            res.json(activeManagements);
            console.log("Gerências ativas:", JSON.stringify(activeManagements));
        } catch (error) {
            console.error("Erro ao buscar gerências ativas:", error);
            res.status(500).json({ error: "Erro ao buscar gerências ativas" });
        }
    }
}