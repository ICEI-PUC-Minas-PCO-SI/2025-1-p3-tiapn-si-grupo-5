import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";

const fakeUsers = [
    { nome: "Ana Paula Souza", email: "ana.souza@trackit.com" },
    { nome: "Carlos Henrique Lima", email: "carlos.lima@trackit.com" },
    { nome: "Fernanda Oliveira", email: "fernanda.oliveira@trackit.com" },
    { nome: "João Pedro Silva", email: "joao.silva@trackit.com" },
    { nome: "Mariana Costa", email: "mariana.costa@trackit.com" },
    { nome: "Rafael Martins", email: "rafael.martins@trackit.com" },
    { nome: "Juliana Almeida", email: "juliana.almeida@trackit.com" },
    { nome: "Lucas Pereira", email: "lucas.pereira@trackit.com" },
    { nome: "Patrícia Mendes", email: "patricia.mendes@trackit.com" },
    { nome: "Rodrigo Gonçalves", email: "rodrigo.goncalves@trackit.com" },
    { nome: "Gabriela Rocha", email: "gabriela.rocha@trackit.com" },
    { nome: "Bruno Carvalho", email: "bruno.carvalho@trackit.com" },
    { nome: "Camila Ribeiro", email: "camila.ribeiro@trackit.com" },
    { nome: "Felipe Duarte", email: "felipe.duarte@trackit.com" },
    { nome: "Larissa Teixeira", email: "larissa.teixeira@trackit.com" },
    { nome: "Thiago Fernandes", email: "thiago.fernandes@trackit.com" },
    { nome: "Vanessa Castro", email: "vanessa.castro@trackit.com" },
    { nome: "Ricardo Barbosa", email: "ricardo.barbosa@trackit.com" },
    { nome: "Beatriz Freitas", email: "beatriz.freitas@trackit.com" },
    { nome: "Eduardo Nunes", email: "eduardo.nunes@trackit.com" },
    { nome: "Aline Lopes", email: "aline.lopes@trackit.com" },
    { nome: "Marcelo Cardoso", email: "marcelo.cardoso@trackit.com" },
    { nome: "Tatiane Moreira", email: "tatiane.moreira@trackit.com" },
    { nome: "Paulo Vitor", email: "paulo.vitor@trackit.com" },
    { nome: "Simone Faria", email: "simone.faria@trackit.com" },
    { nome: "Gustavo Ramos", email: "gustavo.ramos@trackit.com" },
    { nome: "Renata Azevedo", email: "renata.azevedo@trackit.com" },
    { nome: "André Luiz", email: "andre.luiz@trackit.com" },
    { nome: "Débora Pires", email: "debora.pires@trackit.com" },
    { nome: "Fábio Tavares", email: "fabio.tavares@trackit.com" },
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
