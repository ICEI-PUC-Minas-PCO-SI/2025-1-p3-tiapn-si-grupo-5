import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function createUserTypeIfNotExists(idTipoUsuario: number, tipoUsuario: string) {
    const exists = await prisma.tipousuario.findUnique({
        where: { idTipoUsuario }
    });
    if (!exists) {
        await prisma.tipousuario.create({
            data: {
                idTipoUsuario,
                tipoUsuario
            }
        });
        console.log(`Tipo de usuário criado: ${tipoUsuario} (id ${idTipoUsuario})`);
    } else {
        console.log(`Tipo de usuário já existente: ${tipoUsuario} (id ${idTipoUsuario})`);
    }
}

async function main() {
    const userTypes = [
        { idTipoUsuario: 1, tipoUsuario: "Gestor" },
        { idTipoUsuario: 2, tipoUsuario: "Analista" },
        { idTipoUsuario: 3, tipoUsuario: "Usuário" }
    ];

    for (const type of userTypes) {
        await createUserTypeIfNotExists(type.idTipoUsuario, type.tipoUsuario);
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
    npx ts-node scripts/createDefaultUserTypes.ts
*/
