import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function createTicketTypeIfNotExists(nomeTipo: string) {
    if (nomeTipo.length > 50) {
        throw new Error(`O nomeTipo "${nomeTipo}" excede o limite de 50 caracteres.`);
    }
    const exists = await prisma.tipochamado.findFirst({
        where: { nomeTipo }
    });
    if (!exists) {
        await prisma.tipochamado.create({
            data: {
                nomeTipo,
                ativo: 1
            }
        });
        console.log(`Tipo de demanda criado: ${nomeTipo}`);
    } else {
        console.log(`Tipo de demanda já existente: ${nomeTipo}`);
    }
}

async function main() {
    const ticketTypes = [
        { nomeTipo: "Acesso ao ArteRH" },
        { nomeTipo: "Suporte" },
        { nomeTipo: "Portal do servidor" },
        { nomeTipo: "Sistemas" },
        { nomeTipo: "Relatórios" },
        { nomeTipo: "Projetos" },
        { nomeTipo: "IF Ponto" },
        { nomeTipo: "Análise de processos" },
        { nomeTipo: "Ativação/Configuração" },
    ];

    for (const type of ticketTypes) {
        await createTicketTypeIfNotExists(type.nomeTipo);
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

/*
    Para executar este script, use o comando, estando em src/back, execute:
    npx ts-node scripts/createDefaultTicketTypes.ts
*/
