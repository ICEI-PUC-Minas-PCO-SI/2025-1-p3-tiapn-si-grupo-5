import { Express } from "express";
import { UserRoutes } from "./routes/UserRoutes";
import { AuthRoutes } from "./routes/AuthRoutes";
import { DepartmentsRoutes } from "./routes/DepartmentsRoutes";
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
        app.use("/auth", new AuthRoutes().getRouter());
        app.use("/users", new UserRoutes().getRouter());
        app.use("/departments", new DepartmentsRoutes().getRouter());
        app.use("/user-types", new UserTypeRoutes().getRouter());
        app.use("/tickets", new TicketRoutes().getRouter());
        app.use("/statuses", new StatusRoutes().getRouter());
        app.use("/ticket-types", new TicketTypeRoutes().getRouter());
        app.use("/priorities", new PriorityRoutes().getRouter());
        app.use("/dashboard", new DashboardRoutes().getRouter());
        app.use("/chats", new ChatRoutes().getRouter());
        app.use("/notifications", new NotificationRoutes().getRouter());
        app.use("/upload", new UploadRoutes().getRouter());
    }
}
