import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.use("/usuarios", usuarioRoutes);

export default app;
