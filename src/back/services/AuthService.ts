import { PrismaClient } from "../generated/prisma";
import { hashPassword, compareHashedPassword } from "./HashPasswordService";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export class AuthService {
    async register(data: {
        nomeUsuario: string;
        matricula: string;
        ramal: string;
        email: string;
        senha: string;
        gerencia: number;
        tipoUsuario: number;
    }) {
        // Verifica matrícula duplicada
        const existingMatricula = await prisma.usuario.findFirst({ where: { matricula: data.matricula } });
        if (existingMatricula) {
            return { error: "Já existe um usuário cadastrado com esta matrícula." };
        }
        // Verifica email duplicado
        const existingEmail = await prisma.usuario.findFirst({ where: { email: data.email } });
        if (existingEmail) {
            return { error: "Já existe um usuário cadastrado com este e-mail." };
        }
        const hashedSenha = await hashPassword(data.senha);
        const usuario = await prisma.usuario.create({
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
        return { usuario };
    }

    async login(email: string, senha: string) {
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
        const usuarioSenha = await prisma.usuario.findUnique({ where: { email }, select: { senha: true } });
        const senhaValida = usuarioSenha && await compareHashedPassword(senha, usuarioSenha.senha);
        if (!senhaValida) return { error: "Senha inválida", usuario: null };
        return { error: null, usuario };
    }

    async createPasswordResetToken(email: string) {
        const user = await prisma.usuario.findFirst({ where: { email } });
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
        const verificacao = await prisma.verificacao.findUnique({ where: { token } });
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
