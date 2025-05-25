import express from "express";
import cors from "cors";
import { UserRoutes } from "./routes/UserRoutes";
import { ManagementRoutes } from "./routes/ManagementRoutes";
import { UserTypeRoutes } from "./routes/UserTypesRoutes";

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = new UserRoutes();
const managementRoutes = new ManagementRoutes();
const userTypeRoutes = new UserTypeRoutes();

app.use("/usuarios", userRoutes.getRouter());
app.use("/gerencias", managementRoutes.getRouter());
app.use("/tipos-usuarios", userTypeRoutes.getRouter());

export default app;