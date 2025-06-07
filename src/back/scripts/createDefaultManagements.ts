import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function createManagementIfNotExists(nomeGerencia: string) {
    const exists = await prisma.gerencia.findFirst({
        where: { nomeGerencia }
    });
    if (!exists) {
        await prisma.gerencia.create({
            data: {
                nomeGerencia,
                ativo: 1
            }
        });
        console.log(`Gerência criada: ${nomeGerencia}`);
    } else {
        console.log(`Gerência já existente: ${nomeGerencia}`);
    }
}

async function main() {
    // Lista de gerências da PBH (Administração Direta) - exemplos do SIOM
    const managements = [
        { nomeGerencia: "ASTIN" },
        { nomeGerencia: "GEVIF" },
        { nomeGerencia: "GETED" },
        { nomeGerencia: "GESFO" },
        { nomeGerencia: "ASPE" },
        { nomeGerencia: "GECEA" },
        { nomeGerencia: "GESDE" },  
        { nomeGerencia: "GESER" },
        { nomeGerencia: "GGDES" },
        { nomeGerencia: "GPFOT" },
        { nomeGerencia: "GPREB" },
        { nomeGerencia: "GSTRA" }, 
    ];

    for (const mgmt of managements) {
        await createManagementIfNotExists(mgmt.nomeGerencia);
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
    npx ts-node scripts/createDefaultManagements.ts
*/
