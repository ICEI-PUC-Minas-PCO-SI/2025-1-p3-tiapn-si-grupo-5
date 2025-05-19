import express from 'express';
import { PrismaClient } from './generated/prisma';

const cors = require('cors');

const app = express();  // Declarar app primeiro
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

app.post('/usuarios', async (req, res) => {
  try {
    const { nomeUsuario, matricula, ramal, email, senha, gerencia } = req.body;

    const ramalNumber = Number(ramal);
    const gerenciaIdNumber = Number(gerencia);

    const novoUsuario = await prisma.usuario.create({
      data: { nomeUsuario,
        matricula, 
        ramal: ramalNumber,
        email, 
        senha,
        gerencia: {
          connect: { idGerencia: gerenciaIdNumber  },
        }
      },
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
  console.error("Erro ao criar usuário:", error);

  if (error instanceof Error) {
    res.status(500).json({
      error: "Erro ao criar usuário",
      detalhes: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    });
  } else {
    res.status(500).json({
      error: "Erro desconhecido ao criar usuário",
      detalhes: JSON.stringify(error, null, 2),
    });
  }
}
});

export default app;