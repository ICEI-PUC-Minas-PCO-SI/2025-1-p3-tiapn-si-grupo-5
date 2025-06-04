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
const ticketTypeRoutes = new TicketTypeRoutes();

app.use("/usuarios", userRoutes.getRouter());
app.use("/", managementRoutes.getRouter());
app.use("/", userTypeRoutes.getRouter());
app.use("/", ticketRoutes.getRouter());
app.use("/", statusRoutes.getRouter());
app.use("/", ticketTypeRoutes.getRouter());

export default app;