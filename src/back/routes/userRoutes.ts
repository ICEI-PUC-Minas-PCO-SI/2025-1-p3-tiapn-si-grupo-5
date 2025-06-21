import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { autenticarToken } from "../middlewares/auth-jwt";
import { validatePayload } from "../middlewares/validate-payload";
import { z } from "zod";
import { upload } from "../middlewares/multer";

// Schemas para validação
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

export class UserRoutes {
    private router: Router;
    private userController: UserController;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            "/",
            autenticarToken,
            this.userController.getAllUsers.bind(this.userController)
        );
        this.router.get(
            "/analysts",
            autenticarToken,
            this.userController.getAnalysts.bind(this.userController)
        );
        this.router.put(
            "/:idUsuario",
            validatePayload(userUpdateSchema),
            autenticarToken,
            this.userController.updateUser.bind(this.userController)
        );
        this.router.patch(
            "/:idUsuario/status",
            validatePayload(userStatusSchema),
            autenticarToken,
            this.userController.changeUserStatus.bind(this.userController)
        );
        this.router.get(
            "/me",
            autenticarToken,
            this.userController.getMe.bind(this.userController)
        );
        this.router.put(
            "/profile/:idUsuario",
            validatePayload(userProfileUpdateSchema),
            autenticarToken,
            this.userController.updateProfileUser.bind(this.userController)
        );
        this.router.get(
            "/check-email/:email",
            async (req, res, next) => {
                try {
                    await this.userController.checkEmailExists(req, res);
                } catch (err) {
                    next(err);
                }
            }
        );
        this.router.post(
            "/users/:idUsuario/profile-photo",
            autenticarToken,
            upload.single("file"),
            (req, res, next) => {
                this.userController.uploadProfilePhoto(req, res)
                    .then(() => undefined)
                    .catch(next);
            }
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}