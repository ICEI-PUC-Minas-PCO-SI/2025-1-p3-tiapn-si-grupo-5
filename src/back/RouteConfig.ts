import { Express } from "express";
import { UserRoutes } from "./routes/UserRoutes";
import { ManagementRoutes } from "./routes/ManagementRoutes";
import { UserTypeRoutes } from "./routes/UserTypesRoutes";
import { TicketRoutes } from "./routes/TicketRoutes";
import { StatusRoutes } from "./routes/StatusRoutes";
import { TicketTypeRoutes } from "./routes/TicketTypeRoutes";
import { PriorityRoutes } from "./routes/PriorityRoutes";
import { DashboardRoutes } from "./routes/DashboardRoutes";
import { ChatRoutes } from "./routes/ChatRoutes";
import { NotificationRoutes } from "./routes/NotificationRoutes";
import { UploadRoutes } from "./routes/UploadRoutes";

export class RouteConfig {
    public static register(app: Express) {
        app.use("/", new UserRoutes().getRouter());
        app.use("/", new ManagementRoutes().getRouter());
        app.use("/", new UserTypeRoutes().getRouter());
        app.use("/", new TicketRoutes().getRouter());
        app.use("/", new StatusRoutes().getRouter());
        app.use("/", new TicketTypeRoutes().getRouter());
        app.use("/", new PriorityRoutes().getRouter());
        app.use("/", new DashboardRoutes().getRouter());
        app.use("/", new ChatRoutes().getRouter());
        app.use("/", new NotificationRoutes().getRouter());
        app.use("/", new UploadRoutes().getRouter());
    }
}
