import express from "express";
import userRoutes from "./routes/userRoutes";
import managementRoutes from "./routes/managementRoutes";
import typeUsersRoutes from "./routes/userTypesRoutes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/usuarios", userRoutes);
app.use("/gerencias", managementRoutes);
app.use("/tipos-usuarios", typeUsersRoutes);

export default app;
