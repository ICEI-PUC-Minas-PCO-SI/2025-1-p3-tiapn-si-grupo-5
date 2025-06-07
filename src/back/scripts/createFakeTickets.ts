import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

function randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomDateThisMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = Math.floor(Math.random() * 28) + 1;
    const hour = Math.floor(Math.random() * 24);
    const min = Math.floor(Math.random() * 60);
    return new Date(year, month, day, hour, min);
}

const assuntos = [
    "Erro ao acessar sistema",
    "Solicitação de acesso",
    "Dúvida sobre funcionalidade",
    "Problema com relatório",
    "Solicitação de alteração de dados",
    "Problema de login",
    "Solicitação de nova funcionalidade",
    "Atualização de cadastro",
    "Problema de integração",
    "Solicitação de suporte",
    "Dificuldade no uso do sistema",
    "Solicitação de reativação",
    "Problema com senha",
    "Solicitação de exclusão de registro",
    "Dúvida sobre processo",
    "Solicitação de treinamento",
    "Problema de lentidão",
    "Solicitação de desbloqueio",
    "Erro de validação",
    "Solicitação de exportação de dados"
];

const descricoes = [
    "Ocorre um erro ao tentar acessar o sistema. Mensagem: 'Acesso negado'.",
    "Preciso de acesso ao módulo de relatórios para minha função.",
    "Como faço para gerar um relatório mensal de frequência?",
    "O relatório de férias não está mostrando todos os dados.",
    "Solicito alteração do meu endereço cadastrado.",
    "Não consigo fazer login, mesmo com senha correta.",
    "Sugiro adicionar filtro por departamento na tela inicial.",
    "Preciso atualizar meu telefone de contato.",
    "Os dados do ArteRH não estão sincronizando com o Portal.",
    "Preciso de suporte para configurar meu perfil.",
    "Estou com dificuldade para usar a funcionalidade de busca.",
    "Solicito reativação do meu usuário.",
    "Esqueci minha senha e não consigo redefinir.",
    "Solicito exclusão do registro duplicado.",
    "Tenho dúvida sobre o processo de avaliação.",
    "Gostaria de treinamento sobre o uso do sistema.",
    "O sistema está muito lento hoje.",
    "Solicito desbloqueio do meu acesso.",
    "Recebo erro de validação ao salvar dados.",
    "Preciso exportar os dados para Excel."
];

async function main() {
    const users = await prisma.usuario.findMany({
        where: { idTipoUsuario: 3, ativo: 1 }
    });
    const tipos = await prisma.tipochamado.findMany({ where: { ativo: 1 } });
    const prioridades = await prisma.prioridadechamado.findMany({ where: { ativo: 1 } });

    if (!users.length || !tipos.length || !prioridades.length) {
        throw new Error("Usuários, tipos de chamado ou prioridades não encontrados.");
    }

    const ticketsToCreate = 120;
    const protocolosUsados = new Set<string>();

    for (let i = 0; i < ticketsToCreate; i++) {
        const solicitante = randomItem(users);
        const tipo = randomItem(tipos);

        let prioridade;
        if (
            tipo.nomeTipo.toLowerCase().includes("acesso") ||
            tipo.nomeTipo.toLowerCase().includes("erro") ||
            tipo.nomeTipo.toLowerCase().includes("problema")
        ) {
            prioridade = prioridades.find(p =>
                ["Urgente", "Alta"].includes(p.nomePrioridade)
            ) || randomItem(prioridades);
        } else if (
            tipo.nomeTipo.toLowerCase().includes("relatório") ||
            tipo.nomeTipo.toLowerCase().includes("projetos")
        ) {
            prioridade = prioridades.find(p =>
                ["Média"].includes(p.nomePrioridade)
            ) || randomItem(prioridades);
        } else {
            prioridade = prioridades.find(p =>
                ["Baixa", "Rotina", "Informativa"].includes(p.nomePrioridade)
            ) || randomItem(prioridades);
        }

        const assunto = randomItem(assuntos);
        const descricao = randomItem(descricoes);
        const dataAbertura = randomDateThisMonth();

        const chamado = await prisma.chamado.create({
            data: {
                protocolo: "TEMP", // valor temporário, nunca será repetido
                assunto,
                descricao,
                dataAbertura,
                idSolicitante: solicitante.idUsuario,
                idTipoChamado: tipo.idTipoChamado,
                idPrioridade: prioridade.idPrioridade,
                idStatus: null
            }
        });

        const ano = dataAbertura.getFullYear().toString().slice(-2);
        const idZero = chamado.idChamado.toString().padStart(6, "0");
        let protocolo = `${idZero}${ano}`;
        let sufixo = 1;
        while (protocolosUsados.has(protocolo) || await prisma.chamado.findUnique({ where: { protocolo } })) {
            protocolo = `${idZero}${ano}${sufixo}`;
            sufixo++;
        }
        protocolosUsados.add(protocolo);

        await prisma.chamado.update({
            where: { idChamado: chamado.idChamado },
            data: { protocolo }
        });
    }

    console.log(`Criados ${ticketsToCreate} chamados de teste.`);
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
    npx ts-node scripts/createFakeTickets.ts
*/
