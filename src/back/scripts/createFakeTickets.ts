import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

function randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate2024() {
    const year = 2024;
    const month = Math.floor(Math.random() * 12);
    const day = Math.floor(Math.random() * 28) + 1;
    const hour = Math.floor(Math.random() * 24);
    const min = Math.floor(Math.random() * 60);
    return new Date(year, month, day, hour, min);
}

function randomDate2025() {
    const start = new Date(2025, 0, 1).getTime();
    const end = new Date(2025, 5, 6, 23, 59, 59).getTime();
    const date = new Date(start + Math.random() * (end - start));
    return date;
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
    // Busca usuários, tipos, prioridades e status default
    const users = await prisma.usuario.findMany({
        where: { idTipoUsuario: 3, ativo: 1 }
    });
    const tipos = await prisma.tipochamado.findMany({ where: { ativo: 1 } });
    const prioridades = await prisma.prioridadechamado.findMany({ where: { ativo: 1 } });
    const statuses = await prisma.statuschamado.findMany({ where: { ativo: 1 } });
    const analysts = await prisma.usuario.findMany({
        where: { idTipoUsuario: 2, ativo: 1 }
    });

    if (!users.length || !tipos.length || !prioridades.length || !statuses.length || !analysts.length) {
        throw new Error("Usuários, tipos de chamado, prioridades, status ou analistas não encontrados.");
    }

    const ticketsToCreate2024 = 450;
    const ticketsToCreate2025 = 150;
    const protocolosUsados = new Set<string>();

    const statusConcluido = statuses.find(s => s.nomeStatus === "Concluído");
    if (!statusConcluido) throw new Error('Status "Concluído" não encontrado.');
    const nonConcluidoStatuses = statuses.filter(s => s.nomeStatus !== "Concluído");

    // 2024: todos concluídos, todos com analista e status
    for (let i = 0; i < ticketsToCreate2024; i++) {
        const solicitante = randomItem(users);
        const tipo = randomItem(tipos);
        const prioridade = randomItem(prioridades);
        const analista = randomItem(analysts);

        const assunto = randomItem(assuntos);
        const descricao = randomItem(descricoes);
        const dataAbertura = randomDate2024();

        // Sempre concluído
        const statusId = statusConcluido.idStatus;
        // Entre 1h e 15 dias depois
        const delta = Math.floor(Math.random() * (15 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000)) + 60 * 60 * 1000;
        let dataFechamento = new Date(dataAbertura.getTime() + delta);
        if (dataFechamento.getFullYear() > 2024) dataFechamento = new Date(2024, 11, 31, 23, 59, 59);

        const chamado = await prisma.chamado.create({
            data: {
                protocolo: "TEMP",
                assunto,
                descricao,
                dataAbertura,
                dataFechamento,
                idSolicitante: solicitante.idUsuario,
                idTipoChamado: tipo.idTipoChamado,
                idPrioridade: prioridade.idPrioridade,
                idStatus: statusId,
                idAnalista: analista.idUsuario
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

    // 2025: 70% concluídos (com analista e status concluído), 15% não concluídos mas com analista e status aleatório (não concluído), 15% sem analista e sem status
    for (let i = 0; i < ticketsToCreate2025; i++) {
        const solicitante = randomItem(users);
        const tipo = randomItem(tipos);
        const prioridade = randomItem(prioridades);

        const dataAbertura = randomDate2025();
        const assunto = randomItem(assuntos);
        const descricao = randomItem(descricoes);

        let statusId: number | null = null;
        let dataFechamento: Date | null = null;
        let idAnalista: number | null = null;

        const sorteio = Math.random();
        if (sorteio < 0.7) {
            // 70% concluído
            statusId = statusConcluido.idStatus;
            idAnalista = randomItem(analysts).idUsuario;
            const delta = Math.floor(Math.random() * (15 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000)) + 60 * 60 * 1000;
            dataFechamento = new Date(dataAbertura.getTime() + delta);
            const maxDate = new Date(2025, 5, 6, 23, 59, 59);
            if (dataFechamento > maxDate) dataFechamento = maxDate;
        } else if (sorteio < 0.85) {
            // 15% não concluído, mas com analista e status aleatório (não concluído)
            statusId = randomItem(nonConcluidoStatuses).idStatus;
            idAnalista = randomItem(analysts).idUsuario;
            dataFechamento = null;
        } else {
            // 15% sem analista e sem status
            statusId = null;
            idAnalista = null;
            dataFechamento = null;
        }

        const chamado = await prisma.chamado.create({
            data: {
                protocolo: "TEMP",
                assunto,
                descricao,
                dataAbertura,
                dataFechamento,
                idSolicitante: solicitante.idUsuario,
                idTipoChamado: tipo.idTipoChamado,
                idPrioridade: prioridade.idPrioridade,
                idStatus: statusId,
                idAnalista: idAnalista
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

    console.log(`Criados ${ticketsToCreate2024 + ticketsToCreate2025} chamados de teste.`);
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
