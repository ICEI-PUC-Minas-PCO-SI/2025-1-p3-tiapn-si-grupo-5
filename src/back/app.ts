import express, { Express } from "express";
import cors from "cors";
import { UserRoutes } from "./routes/UserRoutes";
import { ManagementRoutes } from "./routes/ManagementRoutes";
import { UserTypeRoutes } from "./routes/UserTypesRoutes";
import { TicketRoutes } from "./routes/TicketRoutes";
import { StatusRoutes } from "./routes/StatusRoutes";
import { TicketTypeRoutes } from "./routes/TicketTypeRoutes";
import { errorHandler } from "./middlewares/error-handler";
import { PriorityRoutes } from "./routes/PriorityRoutes";
import { DashboardRoutes } from "./routes/DashboardRoutes";
import { ChatRoutes } from "./routes/ChatRoutes";
import { NotificationRoutes } from "./routes/NotificationRoutes";
import { UploadRoutes } from "./routes/UploadRoutes";
import cookieParser from "cookie-parser";

export class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.app.use(errorHandler);
    }

    private config() {
        this.app.use(express.json());
        this.app.use(cors({
            origin: process.env.FRONTEND_URL || "http://localhost:5173",
            credentials: true
        }));
        this.app.use(cookieParser());
    }

    private routes() {
        const userRoutes = new UserRoutes();
        const managementRoutes = new ManagementRoutes();
        const userTypeRoutes = new UserTypeRoutes();
        const ticketRoutes = new TicketRoutes();
        const statusRoutes = new StatusRoutes();
        const ticketTypeRoutes = new TicketTypeRoutes();
        const priorityRoutes = new PriorityRoutes();
        const dashboardRoutes = new DashboardRoutes();
        const chatRoutes = new ChatRoutes();
        const notificationRoutes = new NotificationRoutes();
        const uploadRoutes = new UploadRoutes();

        this.app.use("/", userRoutes.getRouter());
        this.app.use("/", managementRoutes.getRouter());
        this.app.use("/", userTypeRoutes.getRouter());
        this.app.use("/", ticketRoutes.getRouter());
        this.app.use("/", statusRoutes.getRouter());
        this.app.use("/", ticketTypeRoutes.getRouter());
        this.app.use("/", priorityRoutes.getRouter());
        this.app.use("/", dashboardRoutes.getRouter());
        this.app.use("/", chatRoutes.getRouter());
        this.app.use("/", notificationRoutes.getRouter());
        this.app.use("/", uploadRoutes.getRouter());
    }

    public getInstance(): Express {
        return this.app;
    }
}