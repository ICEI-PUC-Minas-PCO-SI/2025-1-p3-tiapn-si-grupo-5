import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";

const fakeUsers = [
    { nome: "Ana Paula Souza", email: "ana.souza@pbh.gov.br" },
    { nome: "Carlos Henrique Lima", email: "carlos.lima@pbh.gov.br" },
    { nome: "Fernanda Oliveira", email: "fernanda.oliveira@pbh.gov.br" },
    { nome: "João Pedro Silva", email: "joao.silva@pbh.gov.br" },
    { nome: "Mariana Costa", email: "mariana.costa@pbh.gov.br" },
    { nome: "Rafael Martins", email: "rafael.martins@pbh.gov.br" },
    { nome: "Juliana Almeida", email: "juliana.almeida@pbh.gov.br" },
    { nome: "Lucas Pereira", email: "lucas.pereira@pbh.gov.br" },
    { nome: "Patrícia Mendes", email: "patricia.mendes@pbh.gov.br" },
    { nome: "Rodrigo Gonçalves", email: "rodrigo.goncalves@pbh.gov.br" },
    { nome: "Gabriela Rocha", email: "gabriela.rocha@pbh.gov.br" },
    { nome: "Bruno Carvalho", email: "bruno.carvalho@pbh.gov.br" },
    { nome: "Camila Ribeiro", email: "camila.ribeiro@pbh.gov.br" },
    { nome: "Felipe Duarte", email: "felipe.duarte@pbh.gov.br" },
    { nome: "Larissa Teixeira", email: "larissa.teixeira@pbh.gov.br" },
    { nome: "Thiago Fernandes", email: "thiago.fernandes@pbh.gov.br" },
    { nome: "Vanessa Castro", email: "vanessa.castro@pbh.gov.br" },
    { nome: "Ricardo Barbosa", email: "ricardo.barbosa@pbh.gov.br" },
    { nome: "Beatriz Freitas", email: "beatriz.freitas@pbh.gov.br" },
    { nome: "Eduardo Nunes", email: "eduardo.nunes@pbh.gov.br" },
    { nome: "Aline Lopes", email: "aline.lopes@pbh.gov.br" },
    { nome: "Marcelo Cardoso", email: "marcelo.cardoso@pbh.gov.br" },
    { nome: "Tatiane Moreira", email: "tatiane.moreira@pbh.gov.br" },
    { nome: "Paulo Vitor", email: "paulo.vitor@pbh.gov.br" },
    { nome: "Simone Faria", email: "simone.faria@pbh.gov.br" },
    { nome: "Gustavo Ramos", email: "gustavo.ramos@pbh.gov.br" },
    { nome: "Renata Azevedo", email: "renata.azevedo@pbh.gov.br" },
    { nome: "André Luiz", email: "andre.luiz@pbh.gov.br" },
    { nome: "Débora Pires", email: "debora.pires@pbh.gov.br" },
    { nome: "Fábio Tavares", email: "fabio.tavares@pbh.gov.br" },
];

const prisma = new PrismaClient();

async function main() {
    const gerencias = await prisma.gerencia.findMany();
    if (!gerencias.length) {
        throw new Error("Nenhuma gerência encontrada. Cadastre gerências antes de rodar este script.");
    }

    // Senha padrão (hash Trackit123)
    const senhaHash = await bcrypt.hash("Trackit123", 10);

    for (let i = 0; i < fakeUsers.length; i++) {
        const user = fakeUsers[i];
        const matricula = String(10000000000000 + i).padStart(14, "0") + "X";
        const ramal = "3199" + String(100000 + i).padStart(6, "0");
        const randomGerencia = gerencias[Math.floor(Math.random() * gerencias.length)];
        try {
            await prisma.usuario.create({
                data: {
                    nomeUsuario: user.nome,
                    matricula,
                    ramal,
                    email: user.email,
                    senha: senhaHash,
                    idGerencia: randomGerencia.idGerencia,
                    idTipoUsuario: 3,
                    ativo: 1
                }
            });
            console.log(`Usuário criado: ${user.nome} (${user.email}) - Gerência: ${randomGerencia.nomeGerencia}`);
        } catch (e: unknown) {
            if (
                typeof e === "object" &&
                e !== null &&
                "code" in e &&
                (e as { code?: string }).code === "P2002"
            ) {
                console.log(`Usuário já existe: ${user.nome} (${user.email})`);
            } else {
                console.error(`Erro ao criar usuário ${user.nome}:`, e);
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
    npx ts-node scripts/createFakeUsers.ts
*/
