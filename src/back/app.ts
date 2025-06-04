import express from "express";
import cors from "cors";
import { UserRoutes } from "./routes/UserRoutes";
import { ManagementRoutes } from "./routes/ManagementRoutes";
import { UserTypeRoutes } from "./routes/UserTypesRoutes";
import { TicketRoutes } from "./routes/TicketRoutes";
import { StatusRoutes } from "./routes/StatusRoutes";
import { TicketTypeRoutes } from "./routes/TicketTypeRoutes";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = new UserRoutes();
const managementRoutes = new ManagementRoutes();
const userTypeRoutes = new UserTypeRoutes();
const ticketRoutes = new TicketRoutes();
const statusRoutes = new StatusRoutes();
const ticketTypeRoutes = new TicketTypeRoutes();

// Rotas agrupadas por recurso
app.use("/", userRoutes.getRouter());
app.use("/", managementRoutes.getRouter());
app.use("/", userTypeRoutes.getRouter());
app.use("/", ticketRoutes.getRouter());
app.use("/", statusRoutes.getRouter());
app.use("/", ticketTypeRoutes.getRouter());

// Middleware global de tratamento de erros
app.use(errorHandler);

export default app;