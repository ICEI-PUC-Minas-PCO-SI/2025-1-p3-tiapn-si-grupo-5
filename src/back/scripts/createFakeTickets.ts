import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

function randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Gera datas igualmente distribuídas entre dois meses/anos
function generateDistributedDates(start: Date, end: Date, count: number): Date[] {
    const dates: Date[] = [];
    const startTime = start.getTime();
    const endTime = end.getTime();
    const step = (endTime - startTime) / count;
    for (let i = 0; i < count; i++) {
        // Espalha dentro do intervalo, mas com um pequeno random para não ficar tudo igual
        const base = startTime + i * step;
        const jitter = Math.floor(Math.random() * (step * 0.7)); // até 70% do step
        dates.push(new Date(base + jitter));
    }
    return dates;
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

    const ticketsToCreate2024 = 4500;
    const ticketsToCreate2025 = 2200;
    const totalTickets = ticketsToCreate2024 + ticketsToCreate2025;
    const protocolosUsados = new Set<string>();

    // Contadores sequenciais por ano para garantir consistência
    let seq2024 = 1;
    let seq2025 = 1;

    // Progresso global
    let createdCount = 0;
    let progressInterval: NodeJS.Timeout | null = null;

    // Inicia o log de progresso a cada 5 segundos
    progressInterval = setInterval(() => {
        console.log(`${createdCount}/${totalTickets} chamados criados...`);
    }, 1000);

    const statusConcluido = statuses.find(s => s.nomeStatus === "Concluído");
    if (!statusConcluido) throw new Error('Status "Concluído" não encontrado.');
    const nonConcluidoStatuses = statuses.filter(s => s.nomeStatus !== "Concluído");

    // Gera datas igualmente distribuídas de 01/01/2024 até 31/12/2024 para 2024
    const sequencialDatas2024 = generateDistributedDates(
        new Date(2024, 0, 1, 8, 0, 0),
        new Date(2024, 11, 31, 18, 0, 0),
        ticketsToCreate2024
    );
    // Gera datas igualmente distribuídas de 01/01/2025 até 31/05/2025 para 2025
    const sequencialDatas2025 = generateDistributedDates(
        new Date(2025, 0, 1, 8, 0, 0),
        new Date(2025, 4, 31, 18, 0, 0),
        ticketsToCreate2025
    );

    // 2024: todos concluídos, todos com analista e status
    for (let i = 0; i < ticketsToCreate2024; i++) {
        const solicitante = randomItem(users);
        const tipo = randomItem(tipos);
        const prioridade = randomItem(prioridades);
        const analista = randomItem(analysts);

        const assunto = randomItem(assuntos);
        const descricao = randomItem(descricoes);
        const dataAbertura = sequencialDatas2024[i];

        // Sempre concluído
        const statusId = statusConcluido.idStatus;
        // Entre 1h e 15 dias depois
        const delta = Math.floor(Math.random() * (15 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000)) + 60 * 60 * 1000;
        let dataFechamento = new Date(dataAbertura.getTime() + delta);
        if (dataFechamento.getFullYear() > 2024) dataFechamento = new Date(2024, 11, 31, 23, 59, 59);

        // Gera protocolo consistente ANTES de criar o chamado
        const ano = dataAbertura.getFullYear().toString().slice(-2);
        const idZero = seq2024.toString().padStart(6, "0");
        let protocolo = `${idZero}${ano}`;
        let sufixo = 1;
        while (protocolosUsados.has(protocolo) || await prisma.chamado.findUnique({ where: { protocolo } })) {
            protocolo = `${idZero}${ano}${sufixo}`;
            sufixo++;
        }
        protocolosUsados.add(protocolo);
        seq2024++;

        await prisma.chamado.create({
            data: {
                protocolo,
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
        createdCount++;
    }

    // 2025: 70% concluídos (com analista e status concluído), 15% não concluídos mas com analista e status aleatório (não concluído), 15% sem analista e sem status
    for (let i = 0; i < ticketsToCreate2025; i++) {
        const solicitante = randomItem(users);
        const tipo = randomItem(tipos);
        const prioridade = randomItem(prioridades);

        const dataAbertura = sequencialDatas2025[i];
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

        // Gera protocolo consistente ANTES de criar o chamado
        const ano = dataAbertura.getFullYear().toString().slice(-2);
        const idZero = seq2025.toString().padStart(6, "0");
        let protocolo = `${idZero}${ano}`;
        let sufixo = 1;
        while (protocolosUsados.has(protocolo) || await prisma.chamado.findUnique({ where: { protocolo } })) {
            protocolo = `${idZero}${ano}${sufixo}`;
            sufixo++;
        }
        protocolosUsados.add(protocolo);
        seq2025++;

        await prisma.chamado.create({
            data: {
                protocolo,
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
        createdCount++;
    }

    // Limpa o timer e mostra o total ao final
    if (progressInterval) clearInterval(progressInterval);
    console.log(`Criados ${createdCount} chamados de teste.`);
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
