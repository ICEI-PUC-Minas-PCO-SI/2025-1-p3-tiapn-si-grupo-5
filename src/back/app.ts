import express from "express";
import cors from "cors";
import { UserRoutes } from "./routes/userRoutes";
import { ManagementRoutes } from "./routes/managementRoutes";
import { UserTypeRoutes } from "./routes/userTypesRoutes";
import { TicketRoutes } from "./routes/ticketRoutes";

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = new UserRoutes();
const managementRoutes = new ManagementRoutes();
const userTypeRoutes = new UserTypeRoutes();
const ticketRoutes = new TicketRoutes();

app.use("/usuarios", userRoutes.getRouter());
app.use("/gerencias", managementRoutes.getRouter());
app.use("/tipos-usuarios", userTypeRoutes.getRouter());
app.use("/tickets", ticketRoutes.getRouter());

export default app;