/*TODO: Padronizar Rotas*/

import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { autenticarToken } from "../middlewares/auth-jwt";

export class UserRoutes {
    private router: Router;
    private userController: UserController;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/users/register", this.userController.registerUser.bind(this.userController));
        this.router.post("/users/login", this.userController.loginUser.bind(this.userController));
        this.router.get("/users", this.userController.getAllUsers.bind(this.userController));
        this.router.put("/users/:idUsuario", this.userController.updateUser.bind(this.userController));
        this.router.patch("/users/:idUsuario/status", this.userController.changeUserStatus.bind(this.userController));
        this.router.get("/users/me", autenticarToken, this.userController.getMe.bind(this.userController));
        this.router.put("/users/profile/:idUsuario", this.userController.updateProfileUser.bind(this.userController));
    }

    public getRouter(): Router {
        return this.router;
    }
}