import express from 'express';
import { hashPassword , compareHashedPassword } from './services/hashedPassword';
import { PrismaClient } from './generated/prisma';
import { autenticarToken } from './middlewares/authJWT';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const cors = require('cors');

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

app.post('/usuarios', async (req, res) => {
  try {
    const { nomeUsuario, matricula, ramal, email, senha, gerencia } = req.body;
    const hashedSenha = await hashPassword(senha);
    const ramalNumber = Number(ramal);
    const gerenciaIdNumber = Number(gerencia);
    const novoUsuario = await prisma.usuario.create({
      data: { 
        nomeUsuario,
        matricula, 
        ramal: ramalNumber,
        email, 
        senha: hashedSenha,
        gerencia: {
          connect: { idGerencia: gerenciaIdNumber },
        }
      },
    });
    const { senha: _, ...usuarioSemSenha } = novoUsuario;
    res.status(201).json(usuarioSemSenha);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

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