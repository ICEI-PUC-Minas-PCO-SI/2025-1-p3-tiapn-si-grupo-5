import { Router } from "express";
import { UploadController } from "../controllers/uploadController";
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
            "/upload",
            autenticarToken,
            upload.single("file"),
            this.uploadController.uploadFile.bind(this.uploadController)
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}
