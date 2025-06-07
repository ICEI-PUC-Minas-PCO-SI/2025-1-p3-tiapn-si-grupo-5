import { Request, Response } from "express";
import { UserTypeService } from "../services/userTypeService";

const userTypeService = new UserTypeService();

export class UserTypeController {
    async getAllUserTypes(req: Request, res: Response) {
        try {
            const userTypes = await userTypeService.getAllUserTypes();
            res.json(userTypes);
        } catch (error) {
            console.error("Erro ao buscar tipos de usuário:", error);
            res.status(500).json({ error: "Erro ao buscar tipos de usuário" });
        }
    }
}