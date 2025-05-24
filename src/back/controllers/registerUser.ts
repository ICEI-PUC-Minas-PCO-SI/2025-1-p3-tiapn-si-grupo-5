import { PrismaClient } from "../generated/prisma";
import { hashPassword } from "../services/hashedPassword";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function registerUser(req: Request, res: Response) {
  try {
    const { nomeUsuario, matricula, ramal, email, senha, gerencia, tipoUsuario } = req.body;
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
        idTipoUsuario: tipoUsuario,
        gerencia: {
          connect: { idGerencia: gerenciaIdNumber },
        },
      },
    });
    const { senha: _, ...usuarioSemSenha } = novoUsuario;
    res.status(201).json(usuarioSemSenha);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
}
