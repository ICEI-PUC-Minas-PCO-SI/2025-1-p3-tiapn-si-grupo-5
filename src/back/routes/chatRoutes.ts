import { Router } from "express";
import { ChatController } from "../controllers/chatController";
import { autenticarToken } from "../middlewares/auth-jwt";

export class ChatRoutes {
    private router: Router;
    private chatController: ChatController;

    constructor() {
        this.router = Router();
        this.chatController = new ChatController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            "/chats/:idChamado/messages",
            autenticarToken,
            (req, res, next) => {
                this.chatController.getMessagesByChamado(req, res)
                    .then(() => undefined)
                    .catch(next);
            }
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}
