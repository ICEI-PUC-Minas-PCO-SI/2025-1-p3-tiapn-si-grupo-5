import { Request, Response } from "express";
import { UserTypeService } from "../services/UserTypeService";

const userTypeService = new UserTypeService();

export class UserTypeController {
    async getUserTypes(req: Request, res: Response) {
        try {
            const userTypes = await userTypeService.getUserTypes();
            res.json(userTypes);
        } catch (error) {
            console.error("Erro ao buscar tipos de usuário:", error);
            res.status(500).json({ error: "Erro ao buscar tipos de usuário" });
        }
    }
}