/*TODO: Padronizar Rotas*/

import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { autenticarToken } from "../middlewares/authJWT";

export class UserRoutes {
    private router: Router;
    private userController: UserController;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/register", this.userController.registerUser.bind(this.userController));
        this.router.post("/login", this.userController.loginUser.bind(this.userController));
        this.router.get("/", this.userController.getAllUsers.bind(this.userController));
        this.router.put("/:idUsuario", this.userController.updateUser.bind(this.userController));
        this.router.patch("/:idUsuario/status", this.userController.changeUserStatus.bind(this.userController));
        this.router.get("/me", autenticarToken, this.userController.getMe.bind(this.userController));
        this.router.put("/profile/:idUsuario", this.userController.updateProfileUser.bind(this.userController));
    }

    public getRouter(): Router {
        return this.router;
    }
}