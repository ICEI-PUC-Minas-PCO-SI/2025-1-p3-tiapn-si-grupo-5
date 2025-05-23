import { PrismaClient } from "../generated/prisma";
import { compareHashedPassword } from "../services/hashedPassword";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function loginUser(req: Request, res: Response) {
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
          usuario: {
            nome: usuario.nomeUsuario,
            email: usuario.email,
          },
        });
      }
    }

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
}
