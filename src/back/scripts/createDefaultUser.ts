import { PrismaClient } from "../generated/prisma";
import { hashPassword } from "../services/HashPasswordService";

const prisma = new PrismaClient();

async function main() {
    const senha = "Trackit123";
    const senhaHasheada = await hashPassword(senha);

    const usuario = await prisma.usuario.create({
        data: {
            nomeUsuario: "Usuário TrackIT",
            matricula: "000000000123456",
            ramal: "3199998888",
            email: "admin@trackit.com",
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