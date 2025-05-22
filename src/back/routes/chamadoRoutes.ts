// src/routes/chamadoRoutes.ts
import express, { Request, Response } from 'express';
import { getChamadoById } from '../controllers/chamadoService';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    const chamado = await getChamadoById(numericId);
    if (!chamado) {
      return res.status(404).json({ message: 'Chamado não encontrado' });
    }
    res.json(chamado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar chamado', error });
  }
});

router.post('/teste', async (req: Request, res: Response) => {
  console.log('Rota /teste acessada');
  res.json({ message: 'Rota funcionando corretamente' });
});

export default router;
