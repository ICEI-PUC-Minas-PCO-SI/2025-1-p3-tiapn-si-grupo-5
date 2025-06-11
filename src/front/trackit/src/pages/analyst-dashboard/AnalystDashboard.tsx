import { useEffect, useState } from "react";
import { KpiCard } from "@/components/dasboard/KpiCard";
import { ChartBar } from "@/components/ui/ChartBar";
import { ChartPie } from "@/components/ui/ChartPie";
import { ChartLine } from "@/components/ui/ChartLine";
import { TableSpinner } from "@/components/ui/spinner";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import { getAnalystDashboardSummary } from "@/api/dashboard";
import { useUser } from "@/contexts/UserContext";
import type { ITicket } from "@/api/ticket";
import type { IStatus } from "@/api/status";
import type { IPriority } from "@/api/priority";
import type { ITicketType } from "@/api/tickettype";

export function AnalystDashboard() {
    const { user } = useUser();
    const [ticketTypes, setTicketTypes] = useState<ITicketType[]>([]);
    const [statusList, setStatusList] = useState<IStatus[]>([]);
    const [priorities, setPriorities] = useState<IPriority[]>([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [selectedYearBar, setSelectedYearBar] = useState<string>("");
    const [selectedYearStatusPie, setSelectedYearStatusPie] = useState<string>("");
    const [selectedYearPriorityPie, setSelectedYearPriorityPie] = useState<string>("");
    const [selectedYearLine, setSelectedYearLine] = useState<string>("");

    useEffect(() => {
        if (!user?.id) return;
        setLoading(true);
        getAnalystDashboardSummary(user.id)
            .then(({ tickets, statusList, priorities, ticketTypes }) => {
                setTickets(tickets);
                setStatusList(statusList);
                setPriorities(priorities);
                setTicketTypes(ticketTypes);
                setAlert(null);
            })
            .catch(() => {
                setTickets([]);
                setStatusList([]);
                setPriorities([]);
                setTicketTypes([]);
                setAlert({ type: "error", message: "Não foi possível retornar os dados do dashboard do analista." });
            })
            .finally(() => setLoading(false));
    }, [user]);

    const closedTicketYears = Array.from(
        new Set(
            tickets
                .map(t => {
                    if (!t.dataFechamento) return undefined;
                    const year = new Date(t.dataFechamento).getFullYear();
                    return isNaN(year) ? undefined : year;
                })
                .filter((y): y is number => typeof y === "number")
        )
    ).sort((a, b) => (b ?? 0) - (a ?? 0));

    useEffect(() => {
        if (tickets.length > 0) {
            const years = Array.from(
                new Set(
                    tickets
                        .map(t => {
                            if (!t.dataFechamento) return undefined;
                            const year = new Date(t.dataFechamento).getFullYear();
                            return isNaN(year) ? undefined : year;
                        })
                        .filter((y): y is number => typeof y === "number")
                )
            ).sort((a, b) => (b ?? 0) - (a ?? 0));
            if (years.length > 0) {
                const yearStr = String(years[0]);
                setSelectedYearBar(yearStr);
                setSelectedYearStatusPie(yearStr);
                setSelectedYearPriorityPie(yearStr);
                setSelectedYearLine(yearStr);
            }
        }
    }, [tickets]);

    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const closedTicketsByMonth = months.map((month, idx) => {
        const count = tickets.filter(t => {
            if (!t.dataFechamento) return false;
            const d = new Date(t.dataFechamento);
            return selectedYearBar && d.getFullYear() === Number(selectedYearBar) && d.getMonth() === idx;
        }).length;
        return { month, Quantidade: count };
    });

    const ticketsByStatus = statusList.map((status) => ({
        status,
        count: tickets.filter(t => t.idStatus === status.idStatus).length,
    }));

    const ticketsByStatusForYear = statusList.map((status) => ({
        tipochamado: status.nomeStatus,
        quantity: tickets.filter(t => {
            if (!t.dataAbertura) return false;
            const d = new Date(t.dataAbertura);
            return selectedYearStatusPie && d.getFullYear() === Number(selectedYearStatusPie) && t.idStatus === status.idStatus;
        }).length,
        fill: status.hexCorPrimaria || "#888"
    })).filter(item => item.quantity > 0);

    const ticketsByPriorityForYear = priorities.map((priority) => ({
        tipochamado: priority.nomePrioridade,
        quantity: tickets.filter(t => {
            if (!t.dataAbertura) return false;
            const d = new Date(t.dataAbertura);
            return selectedYearPriorityPie && d.getFullYear() === Number(selectedYearPriorityPie) && t.idPrioridade === priority.idPrioridade;
        }).length,
        fill: priority.hexCorPrimaria || "#888"
    })).filter(item => item.quantity > 0);

    const lineChartData = months.map((month, idx) => {
        const data: { month: string;[key: string]: number | string } = { month };
        ticketTypes.forEach(type => {
            data[type.nomeTipo] = tickets.filter(t => {
                if (!t.dataAbertura) return false;
                const d = new Date(t.dataAbertura);
                return (
                    selectedYearLine &&
                    d.getFullYear() === Number(selectedYearLine) &&
                    d.getMonth() === idx &&
                    t.idTipoChamado === type.idTipoChamado
                );
            }).length;
        });
        return data;
    });

    const lineChartConfig = ticketTypes.reduce((acc, type, idx) => {
        acc[type.nomeTipo] = {
            label: type.nomeTipo,
            color: `var(--chart-${(idx % 12) + 1})`
        };
        return acc;
    }, {} as Record<string, { label: string; color: string }>);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3500);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <div className="flex flex-col h-full gap-8 w-fit">
            {alert && (
                <div className="fixed bottom-4 right-4 z-50">
                    <GlobalAlert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                </div>
            )}
            <div className="flex flex-col gap-4 justify-between">
                <h1 className="title-h1 text-slate-950">
                    Meu Dashboard
                </h1>
                <h3 className="title-h3 text-slate-700">
                    Indicadores históricos dos meus chamados
                </h3>
            </div>
            {loading ? (
                <div className="absolute left-1/2 -translate-x-1/2 top-1/3 flex flex-col items-center justify-center w-full min-h-[400px]">
                    <TableSpinner size={48} />
                </div>
            ) : (
                <>
                    <div className="flex flex-wrap gap-8 items-center w-[66rem]">
                        {ticketsByStatus.map(({ status, count }) => (
                            <KpiCard
                                key={status.idStatus}
                                kpiTitle={status.nomeStatus}
                                kpiValue={count.toString()}
                                kpiColor={status.hexCorPrimaria}
                                kpiLink={`/analyst/my-tickets?status=${status.idStatus}`}
                            />
                        ))}
                    </div>
                    <h3 className="title-h3 text-slate-700">
                        Parâmetros acumulados</h3>
                    <div className="flex flex-wrap gap-8 items-center">
                        <ChartBar
                            chartData={closedTicketsByMonth}
                            chartConfig={{
                                desktop: {
                                    label: "Resolvidos",
                                    color: "var(--chart-6)",
                                },
                            }}
                            cardTitle="Chamados Resolvidos por Mês"
                            cardDescription="Gráfico de barras dos chamados resolvidos ao longo do ano"
                            footerInfo={`Dados acumulados de ${selectedYearBar || "----"}`}
                            years={closedTicketYears}
                            selectedYear={selectedYearBar}
                            onYearChange={setSelectedYearBar}
                        />
                        <ChartPie
                            chartData={ticketsByStatusForYear}
                            chartConfig={{
                                quantity: {
                                    label: "Chamados",
                                },
                            }}
                            cardTitle="Distribuição de Chamados"
                            cardDescription="Gráfico de pizza mostrando a distribuição dos chamados por status"
                            footerInfo={`Dados acumulados de ${selectedYearStatusPie || "----"}`}
                            years={closedTicketYears}
                            selectedYear={selectedYearStatusPie}
                            onYearChange={setSelectedYearStatusPie}
                        />
                        <ChartPie
                            chartData={ticketsByPriorityForYear}
                            chartConfig={{
                                quantity: {
                                    label: "Demandas",
                                },
                            }}
                            cardTitle="Demandas por Nível de Prioridade"
                            cardDescription="Gráfico de pizza mostrando as demandas por nível de prioridade"
                            footerInfo={`Dados acumulados de ${selectedYearPriorityPie || "----"}`}
                            years={closedTicketYears}
                            selectedYear={selectedYearPriorityPie}
                            onYearChange={setSelectedYearPriorityPie}
                        />
                        <ChartLine
                            chartData={lineChartData}
                            chartConfig={lineChartConfig}
                            cardTitle="Demandas por Tipo de Chamado"
                            cardDescription="Gráfico de linhas mostrando demandas por tipo de chamado ao longo dos meses"
                            footerInfo={`Dados acumulados de ${selectedYearLine || "----"}`}
                            years={closedTicketYears}
                            selectedYear={selectedYearLine}
                            onYearChange={setSelectedYearLine}
                        />
                    </div>
                </>
            )}
        </div>
    );
}