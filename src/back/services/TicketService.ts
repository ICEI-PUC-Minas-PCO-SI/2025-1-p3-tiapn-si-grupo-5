import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export class TicketService {
    async createTicket(
        assunto: string,
        descricao: string,
        idSolicitante: number,
        idTipoChamado: number
    ) {
        const dataAbertura = new Date();
        const ticket = await prisma.chamado.create({
            data: {
                protocolo: "",
                assunto,
                descricao,
                dataAbertura,
                idSolicitante,
                idTipoChamado,
                idStatus: null,
                idPrioridade: null,
            },
        });
        const ano = dataAbertura.getFullYear().toString().slice(-2);
        const idZero = ticket.idChamado.toString().padStart(6, "0");
        const protocolo = `${idZero}${ano}`;

        return prisma.chamado.update({
            where: { idChamado: ticket.idChamado },
            data: { protocolo }
        });
    }
}
