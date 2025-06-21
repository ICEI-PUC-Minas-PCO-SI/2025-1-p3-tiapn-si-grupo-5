import { Express } from "express";
import { UserRoutes } from "./routes/userRoutes";
import { AuthRoutes } from "./routes/authRoutes";
import { DepartmentsRoutes } from "./routes/departmentsRoutes";
import { UserTypeRoutes } from "./routes/userTypesRoutes";
import { TicketRoutes } from "./routes/ticketRoutes";
import { StatusRoutes } from "./routes/statusRoutes";
import { TicketTypeRoutes } from "./routes/ticketTypeRoutes";
import { PriorityRoutes } from "./routes/priorityRoutes";
import { DashboardRoutes } from "./routes/dashboardRoutes";
import { ChatRoutes } from "./routes/chatRoutes";
import { NotificationRoutes } from "./routes/notificationRoutes";
import { UploadRoutes } from "./routes/uploadRoutes";

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
