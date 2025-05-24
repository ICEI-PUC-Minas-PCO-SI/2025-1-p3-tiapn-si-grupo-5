import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/usuarios", usuarioRoutes);

export default app;
