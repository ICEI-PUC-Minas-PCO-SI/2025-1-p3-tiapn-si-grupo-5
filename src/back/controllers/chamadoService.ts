import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getChamadoById(idChamado: number) {
  try {
    return await prisma.chamado.findUnique({
      where: { idChamado },
    });
  } catch (error) {
    console.error('Erro ao buscar chamado:', error);
    throw error;
  }
}
