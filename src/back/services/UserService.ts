import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export class UserService {
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
                fotoPerfil: true
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
}
