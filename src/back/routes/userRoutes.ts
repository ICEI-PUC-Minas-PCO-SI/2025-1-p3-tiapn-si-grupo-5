import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { autenticarToken } from "../middlewares/auth-jwt";
import { validatePayload } from "../middlewares/validate-payload";
import { z } from "zod";

// Schemas para validação
const userRegisterSchema = z.object({
    nomeUsuario: z.string().min(3),
    matricula: z.string().min(4),
    ramal: z.string().min(4),
    email: z.string().email(),
    senha: z.string().min(8),
    gerencia: z.union([z.number(), z.string()]),
    tipoUsuario: z.union([z.number(), z.string()])
});
const userUpdateSchema = z.object({
    matricula: z.string().min(4),
    gerencia: z.union([z.number(), z.string()]),
    tipoUsuario: z.union([z.number(), z.string()])
});
const userStatusSchema = z.object({
    ativo: z.union([z.number(), z.string()])
});
const userProfileUpdateSchema = z.object({
    nome: z.string().min(3),
    email: z.string().email(),
    ramal: z.string().min(4)
});
const userLoginSchema = z.object({
    email: z.string().email(),
    senha: z.string().min(8)
});

export class UserRoutes {
    private router: Router;
    private userController: UserController;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            "/users/register",
            // Registro pode ser público, manter sem autenticação
            validatePayload(userRegisterSchema),
            this.userController.registerUser.bind(this.userController)
        );
        this.router.post(
            "/users/login",
            // Login é público
            validatePayload(userLoginSchema),
            this.userController.loginUser.bind(this.userController)
        );
        this.router.get(
            "/users",
            autenticarToken,
            this.userController.getAllUsers.bind(this.userController)
        );
        this.router.get(
            "/users/analysts",
            autenticarToken,
            this.userController.getAnalysts.bind(this.userController)
        );
        this.router.put(
            "/users/:idUsuario",
            validatePayload(userUpdateSchema),
            autenticarToken,
            this.userController.updateUser.bind(this.userController)
        );
        this.router.patch(
            "/users/:idUsuario/status",
            validatePayload(userStatusSchema),
            autenticarToken,
            this.userController.changeUserStatus.bind(this.userController)
        );
        this.router.get(
            "/users/me",
            autenticarToken,
            this.userController.getMe.bind(this.userController)
        );
        this.router.put(
            "/users/profile/:idUsuario",
            validatePayload(userProfileUpdateSchema),
            autenticarToken,
            this.userController.updateProfileUser.bind(this.userController)
        );
        this.router.get(
            "/users/check-email/:email",
            async (req, res, next) => {
                try {
                    await this.userController.checkEmailExists(req, res);
                } catch (err) {
                    next(err);
                }
            }
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}