import express from 'express';
import { compareHashedPassword } from './services/hashedPassword';
import userRoustes from './routes/userRoutes';
import { PrismaClient } from "./generated/prisma";
import { autenticarToken } from './middlewares/authJWT';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express(); 
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

// Rota GET /usuarios
app.get('/usuarios', autenticarToken, async (req, res) => {
  try {
    const clients = await prisma.usuario.findMany();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

app.use("/usuarios", userRoustes);

app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      res.status(401).json({ error: "Email ou senha inválidos" });
    } else {
      const senhaValida = compareHashedPassword(senha, usuario.senha);
      if (!senhaValida) {
        res.status(401).json({ error: "Email ou senha inválidos" });
      } else {
        const token = jwt.sign(
          { id: usuario.idUsuario, email: usuario.email },
          process.env.JWT_SECRET as string,
          { expiresIn: '30m' }
        );
        res.status(200).json({
          message: "Login realizado com sucesso",
          token,
        });
      }
    }

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

export default app;