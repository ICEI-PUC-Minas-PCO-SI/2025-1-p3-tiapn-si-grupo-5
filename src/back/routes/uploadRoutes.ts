import { Router } from "express";
import { UploadController } from "../controllers/UploadController";
import { upload } from "../middlewares/multer";
import { autenticarToken } from "../middlewares/auth-jwt";

export class UploadRoutes {
    private router: Router;
    private uploadController: UploadController;

    constructor() {
        this.router = Router();
        this.uploadController = new UploadController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            "/",
            autenticarToken,
            upload.single("file"),
            (req, res, next) => {
                this.uploadController.uploadFile(req, res)
                    .then(() => undefined)
                    .catch(next);
            }
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}
