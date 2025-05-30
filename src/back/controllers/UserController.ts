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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                select: {
                    idUsuario: true,
                    nomeUsuario: true,
                    email: true,
                    ramal: true,
                    matricula: true,
                    idGerencia: true,
                    idTipoUsuario: true,
                    ativo: true,
                    fotoPerfil: true
                }
            });

            if (!usuario) {
                res.status(401).json({ error: "Email ou senha inválidos" });
            } else if (!usuario.ativo) {
                res.status(403).json({ error: "Usuário inativo" });
            } else {
                let nomeGerencia: string | undefined = undefined;
                if (usuario.idGerencia) {
                    const gerencia = await prisma.gerencia.findUnique({
                        where: { idGerencia: usuario.idGerencia }
                    });
                    nomeGerencia = gerencia?.nomeGerencia;
                }
                const usuarioSenha = await prisma.usuario.findUnique({
                    where: { email },
                    select: { senha: true }
                });
                const senhaValida = usuarioSenha && await compareHashedPassword(senha, usuarioSenha.senha);

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
                            id: usuario.idUsuario,
                            nome: usuario.nomeUsuario,
                            email: usuario.email,
                            ramal: usuario.ramal,
                            matricula: usuario.matricula,
                            gerencia: usuario.idGerencia,
                            tipo: usuario.idTipoUsuario,
                            ativo: usuario.ativo,
                            fotoPerfil: usuario.fotoPerfil,
                            nomeGerencia
                        },
                        token
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

    async changeUserStatus(req: Request, res: Response) {
        try {
            const { idUsuario } = req.params;
            const { ativo } = req.body;

            const updatedUser = await prisma.usuario.update({
                where: { idUsuario: Number(idUsuario) },
                data: { ativo: Number(ativo) },
            });

            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Erro ao mudar status do usuário:", error);
            res.status(500).json({ error: "Erro ao mudar status do usuário" });
        }
    }

    async getMe(req: Request, res: Response) {
        try {
            // @ts-expect-error none
            const usuarioId = req.usuario.id;
            const usuario = await prisma.usuario.findUnique({
                where: { idUsuario: usuarioId },
            });
            if (!usuario) {
                res.status(404).json({ error: "Usuário não encontrado" });
                return;
            }
            res.json({
                usuario: {
                    id: usuario.idUsuario,
                    nome: usuario.nomeUsuario,
                    email: usuario.email,
                    ramal: usuario.ramal,
                    matricula: usuario.matricula,
                    gerencia: usuario.idGerencia,
                    tipo: usuario.idTipoUsuario,
                    ativo: usuario.ativo,
                    fotoPerfil: usuario.fotoPerfil
                }
            });
        } catch (error) {
            console.error("Erro ao buscar usuário autenticado:", error);
            res.status(500).json({ error: "Erro ao buscar usuário autenticado" });
        }
    }

    async updateProfileUser(req: Request, res: Response) {
        try {
            const usuarioId = Number(req.params.idUsuario);
            const { nome, email, ramal } = req.body;

            if (!nome || !email || !ramal) {
                res.status(400).json({ error: "Todos os campos são obrigatórios." });
                return;
            }

            const existingUser = await prisma.usuario.findUnique({
                where: { idUsuario: usuarioId }
            });

            if (!existingUser) {
                res.status(404).json({ error: "Usuário não encontrado." });
                return;
            }

            const updatedUser = await prisma.usuario.update({
                where: { idUsuario: usuarioId },
                data: {
                    nomeUsuario: nome,
                    email,
                    ramal,
                },
            });

            res.status(200).json({
                id: updatedUser.idUsuario,
                nome: updatedUser.nomeUsuario,
                email: updatedUser.email,
                ramal: updatedUser.ramal,
                matricula: updatedUser.matricula,
                gerencia: updatedUser.idGerencia,
                tipo: updatedUser.idTipoUsuario,
                ativo: updatedUser.ativo,
                fotoPerfil: updatedUser.fotoPerfil,
            });
            return;
        } catch (error) {
            console.error("Erro ao atualizar perfil do usuário:", error);
            res.status(500).json({ error: "Erro ao atualizar perfil do usuário" });
            return;
        }
    }
}