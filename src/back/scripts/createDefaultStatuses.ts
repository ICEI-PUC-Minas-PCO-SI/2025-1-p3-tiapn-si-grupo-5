import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function createStatusIfNotExists(nomeStatus: string, hexCorPrimaria: string, hexCorSecundaria: string) {
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
                hexCorPrimaria,
                hexCorSecundaria,
                ativo: 1
            }
        });
        console.log(`Status criado: ${nomeStatus}`);
    } else {
        console.log(`Status já existente: ${nomeStatus}`);
    }
}

function getContrastColor(hex: string): string {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

async function main() {
    const statuses = [
        { nomeStatus: "Cancelado", hexCorPrimaria: "#B0BEC5" },
        { nomeStatus: "Em análise", hexCorPrimaria: "#1976D2" },
        { nomeStatus: "Em execução", hexCorPrimaria: "#FB8C00" },
        { nomeStatus: "Concluído", hexCorPrimaria: "#43A047" },
        { nomeStatus: "Aguardando resposta", hexCorPrimaria: "#8E24AA" },
    ];

    for (const status of statuses) {
        const hexCorSecundaria = getContrastColor(status.hexCorPrimaria);
        await createStatusIfNotExists(status.nomeStatus, status.hexCorPrimaria, hexCorSecundaria);
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
