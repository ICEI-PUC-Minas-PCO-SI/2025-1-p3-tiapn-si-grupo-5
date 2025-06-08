import { useEffect, useState } from "react";
import { KpiCard } from "@/components/dasboard/KpiCard";
import { ChartBar } from "@/components/ui/ChartBar";
import { ChartPie } from "@/components/ui/ChartPie";
import { ChartLine } from "@/components/ui/ChartLine";
import { DashboardDataTable } from "@/components/dasboard/DashboardDataTable";
import { getAllStatus, type IStatus } from "@/api/status";
import { getAllTickets, type ITicket } from "@/api/ticket";

export function Dashboard() {
    const [statusList, setStatusList] = useState<IStatus[]>([]);
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all([getAllStatus(), getAllTickets()])
            .then(([statuses, tickets]) => {
                setStatusList(statuses);
                setTickets(tickets);
            })
            .finally(() => setLoading(false));
    }, []);

    // Conta tickets por status
    const ticketsByStatus = statusList.map((status) => {
        const count = tickets.filter(t => t.idStatus === status.idStatus).length;
        return {
            ...status,
            count,
        };
    });

    return (
        <div className="flex flex-col h-full gap-8 w-fit">
            <div className="flex gap-4 justify-between">
                <h1 className="title-h1 text-slate-950">
                    Dashboard
                </h1>
            </div>
            <div className="flex flex-wrap gap-8 items-center w-[66rem]">
                {ticketsByStatus.map((status) => (
                    <KpiCard
                        key={status.idStatus}
                        kpiTitle={status.nomeStatus}
                        kpiValue={loading ? "..." : status.count.toString()}
                        kpiLink={`/admin/assigned-tickets?status=${status.idStatus}`}
                        kpiColor={status.hexCorPrimaria}
                    />
                ))}
            </div>
            <div className="flex flex-wrap gap-8 items-center">
                <ChartBar
                    chartData={[
                        { month: "January", quantity: 320 },
                        { month: "February", quantity: 250 },
                        { month: "March", quantity: 180 },
                        { month: "April", quantity: 300 },
                        { month: "May", quantity: 220 },
                        { month: "June", quantity: 250 },
                        { month: "July", quantity: 300 },
                        { month: "August", quantity: 280 },
                        { month: "September", quantity: 310 },
                        { month: "October", quantity: 330 },
                        { month: "November", quantity: 250 },
                        { month: "December", quantity: 400 },
                    ]}
                    chartConfig={{
                        desktop: {
                            label: "Resolvidos",
                            color: "var(--chart-6)",
                        },
                    }}
                    cardTitle="Chamados Resolvidos por Mês"
                    cardDescription="Gráfico de barras dos chamados resolvidos ao longo do ano"
                    trendInfo="Tendência de crescimento ao longo do ano"
                    footerInfo="Dados acumulados de 2024"
                />
                <ChartPie
                    chartData={[
                        { tipochamado: "Resolvidos", quantity: 150, fill: "var(--chart-6)" },
                        { tipochamado: "Em aberto", quantity: 150, fill: "var(--chart-7)" },
                        { tipochamado: "Aguardando resposta", quantity: 150, fill: "var(--chart-8)" },
                        { tipochamado: "Em análise", quantity: 150, fill: "var(--chart-9)" },
                    ]}
                    chartConfig={{
                        quantity: {
                            label: "Chamados",
                        },
                        resolvidos: {
                            label: "Resolvidos",
                            color: "var(--chart-6)",
                        },
                        emAberto: {
                            label: "Em aberto",
                            color: "var(--chart-7)",
                        },
                        aguardandoResposta: {
                            label: "Aguardando resposta",
                            color: "var(--chart-8)",
                        },
                        emAnalise: {
                            label: "Em análise",
                            color: "var(--chart-9)",
                        },
                    }}
                    cardTitle="Distribuição de Chamados"
                    cardDescription="Gráfico de pizza mostrando a distribuição dos chamados"
                    trendInfo="Distribuição uniforme entre os tipos de chamados"
                    footerInfo="Dados acumulados de 2024"
                />
                <ChartPie
                    chartData={[
                        { tipochamado: "Alta", quantity: 120, fill: "var(--chart-10)" },
                        { tipochamado: "Média", quantity: 200, fill: "var(--chart-7)" },
                        { tipochamado: "Baixa", quantity: 80, fill: "var(--chart-6)" },
                    ]}
                    chartConfig={{
                        quantity: {
                            label: "Demandas",
                        },
                        alta: {
                            label: "Alta",
                            color: "var(--chart-6)",
                        },
                        media: {
                            label: "Média",
                            color: "var(--chart-7)",
                        },
                        baixa: {
                            label: "Baixa",
                            color: "var(--chart-8)",
                        },
                    }}
                    cardTitle="Demandas por Nível de Prioridade"
                    cardDescription="Gráfico de pizza mostrando as demandas por nível de prioridade"
                    trendInfo="Alta prioridade representa maior parte das demandas"
                    footerInfo="Dados acumulados de 2024"
                />
                <ChartLine
                    chartData={[
                        { month: "January", hardware: 50, software: 70, network: 40, security: 30, training: 20, consulting: 60, quantity: 10 },
                        { month: "February", hardware: 60, software: 80, network: 50, security: 40, training: 30, consulting: 70, quantity: 20 },
                        { month: "March", hardware: 70, software: 90, network: 60, security: 50, training: 40, consulting: 80, quantity: 30 },
                        { month: "April", hardware: 80, software: 100, network: 70, security: 60, training: 50, consulting: 90, quantity: 40 },
                        { month: "May", hardware: 90, software: 110, network: 80, security: 70, training: 60, consulting: 100, quantity: 50 },
                        { month: "June", hardware: 100, software: 120, network: 90, security: 80, training: 70, consulting: 110, quantity: 60 },
                        { month: "July", hardware: 110, software: 130, network: 100, security: 90, training: 80, consulting: 120, quantity: 70 },
                    ]}
                    chartConfig={{
                        hardware: { label: "Hardware", color: "var(--chart-1)" },
                        software: { label: "Software", color: "var(--chart-2)" },
                        network: { label: "Network", color: "var(--chart-3)" },
                        security: { label: "Security", color: "var(--chart-4)" },
                        training: { label: "Training", color: "var(--chart-5)" },
                        consulting: { label: "Consulting", color: "var(--chart-6)" },
                        quantity: { label: "Other", color: "var(--chart-7)" },
                    }}
                    cardTitle="Demandas por Tipo de Helpdesk"
                    cardDescription="Gráfico de linhas mostrando demandas típicas de helpdesk ao longo dos monthes"
                    trendInfo="Tendência de aumento nas demandas de hardware e software"
                    footerInfo="Dados acumulados de 2024"
                />
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="title-h2 text-slate-950">Analistas e Demandas</h2>
                <DashboardDataTable />
            </div>
        </div>
    );
}