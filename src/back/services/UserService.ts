import { PrismaClient } from "../generated/prisma";
import { hashPassword, compareHashedPassword } from "./hashPasswordService";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export class UserService {
    async registerUser(data: {
        nomeUsuario: string;
        matricula: string;
        ramal: string;
        email: string;
        senha: string;
        gerencia: number;
        tipoUsuario: number;
    }) {
        const hashedSenha = await hashPassword(data.senha);
        return prisma.usuario.create({
            data: {
                nomeUsuario: data.nomeUsuario,
                matricula: data.matricula,
                ramal: String(data.ramal),
                email: data.email,
                senha: hashedSenha,
                idTipoUsuario: Number(data.tipoUsuario),
                idGerencia: Number(data.gerencia),
            },
        });
    }

    async loginUser(email: string, senha: string) {
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
        if (!usuario) return { error: "Usuário não encontrado", usuario: null };
        if (!usuario.ativo) return { error: "Usuário inativo", usuario: null };

        const usuarioSenha = await prisma.usuario.findUnique({
            where: { email },
            select: { senha: true }
        });
        const senhaValida = usuarioSenha && await compareHashedPassword(senha, usuarioSenha.senha);
        if (!senhaValida) return { error: "Senha inválida", usuario: null };

        return { error: null, usuario };
    }

    async getAllUsers() {
        return prisma.usuario.findMany({
            select: {
                idUsuario: true,
                nomeUsuario: true,
                matricula: true,
                idTipoUsuario: true,
                idGerencia: true,
                ativo: true,
                email: true,
                ramal: true,
                fotoPerfil: true // Adicionado
            }
        });
    }

    async updateUser(idUsuario: number, data: { matricula?: string; gerencia?: number; tipoUsuario?: number }) {
        return prisma.usuario.update({
            where: { idUsuario },
            data: {
                matricula: data.matricula,
                idGerencia: data.gerencia ? Number(data.gerencia) : undefined,
                idTipoUsuario: data.tipoUsuario ? Number(data.tipoUsuario) : undefined,
            },
        });
    }

    async changeUserStatus(idUsuario: number, ativo: number) {
        return prisma.usuario.update({
            where: { idUsuario },
            data: { ativo: Number(ativo) },
        });
    }

    async getMe(usuarioId: number) {
        return prisma.usuario.findUnique({
            where: { idUsuario: usuarioId },
            select: {
                idUsuario: true,
                nomeUsuario: true,
                email: true,
                ramal: true,
                matricula: true,
                idGerencia: true,
                idTipoUsuario: true,
                ativo: true,
                fotoPerfil: true,
                gerencia: {
                    select: {
                        nomeGerencia: true
                    }
                }
            }
        });
    }

    async updateProfileUser(usuarioId: number, data: { nome: string; email: string; ramal: string }) {
        return prisma.usuario.update({
            where: { idUsuario: usuarioId },
            data: {
                nomeUsuario: data.nome,
                email: data.email,
                ramal: data.ramal,
            },
        });
    }

    async updateProfilePhoto(idUsuario: number, fotoPerfilUrl: string) {
        return prisma.usuario.update({
            where: { idUsuario },
            data: { fotoPerfil: fotoPerfilUrl }
        });
    }

    async findUserByEmail(email: string) {
        return prisma.usuario.findFirst({
            where: { email }
        });
    }

    async findUserByMatricula(matricula: string) {
        return prisma.usuario.findFirst({
            where: { matricula }
        });
    }

    async getAnalysts() {
        return prisma.usuario.findMany({
            where: { idTipoUsuario: 2 },
            select: {
                idUsuario: true,
                nomeUsuario: true,
                matricula: true,
                idTipoUsuario: true,
                idGerencia: true,
                ativo: true,
                email: true,
                ramal: true,
                dataCadastro: true,
            }
        });
    }

    async createPasswordResetToken(email: string) {
        const user = await this.findUserByEmail(email);
        if (!user) return null;

        const token = uuidv4();
        const expiraEm = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos

        await prisma.verificacao.create({
            data: {
                idUsuario: user.idUsuario,
                token,
                tipo: "reset_password",
                expiraEm
            }
        });

        return { user, token };
    }

    async resetPasswordByToken(token: string, novaSenha: string) {
        const verificacao = await prisma.verificacao.findUnique({
            where: { token }
        });
        if (!verificacao || !verificacao.expiraEm || verificacao.expiraEm < new Date()) {
            return { success: false, error: "Token inválido ou expirado" };
        }
        const hashed = await hashPassword(novaSenha);
        await prisma.usuario.update({
            where: { idUsuario: verificacao.idUsuario },
            data: { senha: hashed }
        });
        await prisma.verificacao.delete({ where: { token } });
        return { success: true };
    }
}
