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
        { nomeTipo: "Acesso ao arterh" },
        { nomeTipo: "Suporte" },
        { nomeTipo: "Portal do servidor" },
        { nomeTipo: "Atualização do ad" },
        { nomeTipo: "Sistemas" },
        { nomeTipo: "Relatórios" },
        { nomeTipo: "Projetos" },
        { nomeTipo: "Ifponto" },
        { nomeTipo: "Alteração de validações" },
        { nomeTipo: "Análise/correção de processos" },
        { nomeTipo: "Ativação/criação/configuração/exclusão" },
        { nomeTipo: "Avaliação de desempenho" },
        { nomeTipo: "Classificação do servidor" },
        { nomeTipo: "Demonstrativo de pagamento" }
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
