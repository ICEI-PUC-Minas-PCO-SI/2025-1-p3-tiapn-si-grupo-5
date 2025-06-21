import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validatePayload } from "../middlewares/validate-payload";
import { z } from "zod";

const userRegisterSchema = z.object({
    nomeUsuario: z.string().min(3),
    matricula: z.string().min(4),
    ramal: z.string().min(4),
    email: z.string().email(),
    senha: z.string().min(8),
    gerencia: z.union([z.number(), z.string()]),
    tipoUsuario: z.union([z.number(), z.string()])
});
const userLoginSchema = z.object({
    email: z.string().email(),
    senha: z.string().min(8)
});
const requestResetSchema = z.object({
    email: z.string().email()
});
const resetPasswordSchema = z.object({
    token: z.string().uuid(),
    senha: z.string().min(8)
});

export class AuthRoutes {
    private router: Router;
    private authController: AuthController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            "/register",
            validatePayload(userRegisterSchema),
            (req, res, next) => { this.authController.register(req, res).then(() => undefined).catch(next); }
        );
        this.router.post(
            "/login",
            validatePayload(userLoginSchema),
            (req, res, next) => { this.authController.login(req, res).then(() => undefined).catch(next); }
        );
        this.router.post(
            "/logout",
            (req, res, next) => { this.authController.logout(req, res).then(() => undefined).catch(next); }
        );
        this.router.post(
            "/request-password-reset",
            validatePayload(requestResetSchema),
            (req, res, next) => { this.authController.requestPasswordReset(req, res).then(() => undefined).catch(next); }
        );
        this.router.post(
            "/reset-password",
            validatePayload(resetPasswordSchema),
            (req, res, next) => { this.authController.resetPassword(req, res).then(() => undefined).catch(next); }
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}
