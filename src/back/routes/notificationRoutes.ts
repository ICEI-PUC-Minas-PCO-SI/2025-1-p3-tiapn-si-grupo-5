import { Router } from "express";
import { NotificationController } from "../controllers/notificationController";
import { autenticarToken } from "../middlewares/auth-jwt";

export class NotificationRoutes {
    private router: Router;
    private notificationController: NotificationController;

    constructor() {
        this.router = Router();
        this.notificationController = new NotificationController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            "/notifications/:idUsuario",
            autenticarToken,
            (req, res, next) => {
                this.notificationController.getUserNotifications(req, res)
                    .then(() => undefined)
                    .catch(next);
            }
        );
        this.router.patch(
            "/notifications/:idNotificacao/read",
            autenticarToken,
            (req, res, next) => {
                this.notificationController.markAsRead(req, res)
                    .then(() => undefined)
                    .catch(next);
            }
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}
