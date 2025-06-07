import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function createStatusIfNotExists(nomeStatus: string, hexCor: string) {
    if (nomeStatus.length > 50) {
        throw new Error(`O nomeStatus "${nomeStatus}" excede o limite de 50 caracteres.`);
    }
    const exists = await prisma.statuschamado.findFirst({
        where: { nomeStatus }
    });
    if (!exists) {
        await prisma.statuschamado.create({
            data: {
                nomeStatus,
                hexCorPrimaria: hexCor,
                hexCorSecundaria: hexCor,
                ativo: 1
            }
        });
        console.log(`Status criado: ${nomeStatus}`);
    } else {
        console.log(`Status já existente: ${nomeStatus}`);
    }
}

async function main() {
    const statuses = [
        { nomeStatus: "Cancelado", hexCor: "#B0BEC5" },
        { nomeStatus: "Não iniciado", hexCor: "#757575" },
        { nomeStatus: "Em análise", hexCor: "#1976D2" },
        { nomeStatus: "Em execução", hexCor: "#FB8C00" },
        { nomeStatus: "Concluído", hexCor: "#43A047" },
        { nomeStatus: "Concluído parcialmente", hexCor: "#FDD835" },
        { nomeStatus: "Aguardando resposta Usuário", hexCor: "#8E24AA" },
        { nomeStatus: "Pendente. vide obs.", hexCor: "#E53935" }
    ];

    for (const status of statuses) {
        await createStatusIfNotExists(status.nomeStatus, status.hexCor);
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
    npx ts-node scripts/createDefaultStatuses.ts
*/
