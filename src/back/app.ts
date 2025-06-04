import express from "express";
import cors from "cors";
import { UserRoutes } from "./routes/userRoutes";
import { ManagementRoutes } from "./routes/managementRoutes";
import { UserTypeRoutes } from "./routes/userTypesRoutes";
import { TicketRoutes } from "./routes/ticketRoutes";
import { StatusRoutes } from "./routes/statusRoutes";
import { TicketTypeRoutes } from "./routes/ticketTypeRoutes";

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = new UserRoutes();
const managementRoutes = new ManagementRoutes();
const userTypeRoutes = new UserTypeRoutes();
const ticketRoutes = new TicketRoutes();
const statusRoutes = new StatusRoutes();
const ticketTypeRoutes = new TicketTypeRoutes(); // adicionado

app.use("/usuarios", userRoutes.getRouter());
app.use("/gerencias", managementRoutes.getRouter());
app.use("/tipos-usuarios", userTypeRoutes.getRouter());
app.use("/tickets", ticketRoutes.getRouter());
app.use("/", statusRoutes.getRouter());
app.use("/", ticketTypeRoutes.getRouter()); // adicionado

export default app;