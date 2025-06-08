import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const fakeAnalysts = [
    { nome: "Bruno Carvalho", email: "bruno.carvalho@pbh.gov.br" },
    { nome: "Carla Torres", email: "carla.torres@pbh.gov.br" },
    { nome: "Diego Andrade", email: "diego.andrade@pbh.gov.br" },
    { nome: "Elisa Martins", email: "elisa.martins@pbh.gov.br" },
    { nome: "Fábio Souza", email: "fabio.souza@pbh.gov.br" },
    { nome: "Gisele Lima", email: "gisele.lima@pbh.gov.br" },
    { nome: "Henrique Castro", email: "henrique.castro@pbh.gov.br" },
    { nome: "Isabela Rocha", email: "isabela.rocha@pbh.gov.br" },
    { nome: "Jorge Silva", email: "jorge.silva@pbh.gov.br" },
    { nome: "Karla Mendes", email: "karla.mendes@pbh.gov.br" },
    { nome: "Leonardo Dias", email: "leonardo.dias@pbh.gov.br" },
    { nome: "Marina Alves", email: "marina.alves@pbh.gov.br" },
    { nome: "Natália Freitas", email: "natalia.freitas@pbh.gov.br" },
    { nome: "Otávio Ramos", email: "otavio.ramos@pbh.gov.br" },
    { nome: "Paula Teixeira", email: "paula.teixeira@pbh.gov.br" },
];

async function main() {
    const astin = await prisma.gerencia.findFirst({
        where: { nomeGerencia: "ASTIN" }
    });
    if (!astin) {
        throw new Error("Gerência ASTIN não encontrada. Cadastre ASTIN antes de rodar este script.");
    }

    // Senha padrão (hash Trackit123)
    const senhaHash = await bcrypt.hash("Trackit123", 10);

    for (let i = 0; i < fakeAnalysts.length; i++) {
        const user = fakeAnalysts[i];
        const matricula = String(20000000000000 + i).padStart(14, "0") + "X";
        const ramal = "3199" + String(200000 + i).padStart(6, "0");
        try {
            await prisma.usuario.create({
                data: {
                    nomeUsuario: user.nome,
                    matricula,
                    ramal,
                    email: user.email,
                    senha: senhaHash,
                    idGerencia: astin.idGerencia,
                    idTipoUsuario: 2,
                    ativo: 1
                }
            });
            console.log(`Analista criado: ${user.nome} (${user.email})`);
        } catch (e: unknown) {
            if (
                typeof e === "object" &&
                e !== null &&
                "code" in e &&
                (e as { code?: string }).code === "P2002"
            ) {
                console.log(`Analista já existe: ${user.nome} (${user.email})`);
            } else {
                console.error(`Erro ao criar analista ${user.nome}:`, e);
            }
        }
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
    npx ts-node scripts/createAstinAnalysts.ts
*/
