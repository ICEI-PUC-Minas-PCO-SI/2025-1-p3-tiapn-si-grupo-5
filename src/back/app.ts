import express from 'express';
import userRoustes from './routes/userRoutes';
import { PrismaClient } from "./generated/prisma";
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const app = express(); 
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

// Rota GET /usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const clients = await prisma.usuario.findMany();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

app.use("/usuarios", userRoustes);

export default app;