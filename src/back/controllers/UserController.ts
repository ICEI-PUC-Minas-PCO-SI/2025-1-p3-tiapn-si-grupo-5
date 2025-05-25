import { PrismaClient } from "../generated/prisma";
import { hashPassword, compareHashedPassword } from "../services/hashedPassword";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class UserController {
    async registerUser(req: Request, res: Response) {
        try {
            const { nomeUsuario, matricula, ramal, email, senha, gerencia, tipoUsuario } = req.body;
            const hashedSenha = await hashPassword(senha);
            const ramalNumber = String(ramal);
            const gerenciaIdNumber = Number(gerencia);
            const tipoUsuarioId = Number(tipoUsuario);
            const novoUsuario = await prisma.usuario.create({
                data: {
                    nomeUsuario,
                    matricula,
                    ramal: ramalNumber,
                    email,
                    senha: hashedSenha,
                    idTipoUsuario: tipoUsuarioId,
                    idGerencia: gerenciaIdNumber
                },
            });
            const { senha: _, ...usuarioSemSenha } = novoUsuario;
            res.status(201).json(usuarioSemSenha);
            console.log(JSON.stringify(usuarioSemSenha));
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            res.status(500).json({ error: "Erro ao criar usuário" });
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;

            const usuario = await prisma.usuario.findUnique({
                where: { email },
            });

            if (!usuario) {
                res.status(401).json({ error: "Email ou senha inválidos" });
            } else {
                const senhaValida = await compareHashedPassword(senha, usuario.senha);
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

    async getAllUsers(req: Request, res: Response) {
        try {
            const clients = await prisma.usuario.findMany();
            res.json(clients);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { idUsuario } = req.params;
            const { matricula, gerencia, tipoUsuario } = req.body;

            const updatedUser = await prisma.usuario.update({
                where: { idUsuario: Number(idUsuario) },
                data: {
                    matricula,
                    idGerencia: gerencia ? Number(gerencia) : undefined,
                    idTipoUsuario: tipoUsuario ? Number(tipoUsuario) : undefined,
                },
            });

            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            res.status(500).json({ error: "Erro ao atualizar usuário" });
        }
    }
}