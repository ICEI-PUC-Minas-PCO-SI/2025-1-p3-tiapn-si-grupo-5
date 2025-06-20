import { PrismaClient } from "../generated/prisma";
import { hashPassword } from "../services/HashPasswordService";

const prisma = new PrismaClient();

async function main() {
    const email = "notifications.trackit@gmail.com";
    const exists = await prisma.usuario.findFirst({
        where: { email }
    });

    if (exists) {
        console.log("Usuário padrão já existe:", email);
        return;
    }

    const senha = "Trackit123";
    const senhaHasheada = await hashPassword(senha);

    const usuario = await prisma.usuario.create({
        data: {
            nomeUsuario: "Admin TrackIT",
            matricula: "000000000123456",
            ramal: "0000000000",
            email,
            senha: senhaHasheada,
            idTipoUsuario: 1,
            idGerencia: 1,
            ativo: 1
        }
    });

    console.log("Usuário padrão criado:", usuario);
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
    npx ts-node scripts/createDefaultUser.ts
*/