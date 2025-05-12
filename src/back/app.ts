import express from 'express';
import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Rota GET /usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const clients = await prisma.usuario.findMany();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

export default app;