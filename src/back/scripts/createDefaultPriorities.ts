import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function createPriorityIfNotExists(nomePrioridade: string, hexCorPrimaria: string, hexCorSecundaria: string) {
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
                hexCorPrimaria,
                hexCorSecundaria,
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
        { nomePrioridade: "Urgente", hexCorPrimaria: "#E53935", hexCorSecundaria: "#FFFFFF" },
        { nomePrioridade: "Alta", hexCorPrimaria: "#FB8C00", hexCorSecundaria: "#000000" },
        { nomePrioridade: "Média", hexCorPrimaria: "#FDD835", hexCorSecundaria: "#000000" },
        { nomePrioridade: "Baixa", hexCorPrimaria: "#43A047", hexCorSecundaria: "#FFFFFF" },
    ];

    for (const priority of priorities) {
        await createPriorityIfNotExists(priority.nomePrioridade, priority.hexCorPrimaria, priority.hexCorSecundaria);
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
