import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function createPriorityIfNotExists(nomePrioridade: string, hexCor: string) {
    if (nomePrioridade.length > 50) {
        throw new Error(`O nomePrioridade "${nomePrioridade}" excede o limite de 50 caracteres.`);
    }
    const exists = await prisma.prioridadechamado.findFirst({
        where: { nomePrioridade }
    });
    if (!exists) {
        await prisma.prioridadechamado.create({
            data: {
                nomePrioridade,
                hexCorPrimaria: hexCor,
                hexCorSecundaria: hexCor,
                ativo: 1
            }
        });
        console.log(`Prioridade criada: ${nomePrioridade}`);
    } else {
        console.log(`Prioridade já existente: ${nomePrioridade}`);
    }
}

async function main() {
    const priorities = [
        { nomePrioridade: "Urgente", hexCor: "#E53935" },
        { nomePrioridade: "Alta", hexCor: "#FB8C00" },
        { nomePrioridade: "Média", hexCor: "#FDD835" },
        { nomePrioridade: "Baixa", hexCor: "#43A047" },
    ];

    for (const priority of priorities) {
        await createPriorityIfNotExists(priority.nomePrioridade, priority.hexCor);
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
    npx ts-node scripts/createDefaultPriorities.ts
*/
