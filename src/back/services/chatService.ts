import { PrismaClient, msgchamado_remetente } from "../generated/prisma";
const prisma = new PrismaClient();

export class ChatService {
    async saveMessage(data: {
        idChamado: number;
        idRemetente: number;
        mensagem: string;
        remetente: "usuario" | "analista";
        urlAnexo?: string | null;
        nomeArquivo?: string | null;
    }) {
        return prisma.msgchamado.create({
            data: {
                idChamado: data.idChamado,
                idRemetente: data.idRemetente,
                mensagem: data.mensagem,
                remetente: data.remetente as msgchamado_remetente,
                urlAnexo: data.urlAnexo || null,
                nomeArquivo: data.nomeArquivo || null,
            },
            select: {
                idMensagem: true,
                mensagem: true,
                timestamp: true,
                remetente: true,
                idRemetente: true,
                urlAnexo: true,
                nomeArquivo: true,
            }
        });
    }

    async getMessagesByChamado(idChamado: number) {
        return prisma.msgchamado.findMany({
            where: { idChamado },
            orderBy: { timestamp: "asc" }
        });
    }
}
