import { useEffect, useState } from "react";
import { KpiCard } from "@/components/dasboard/KpiCard";
import { ChartBar } from "@/components/ui/ChartBar";
import { ChartPie } from "@/components/ui/ChartPie";
import { ChartLine } from "@/components/ui/ChartLine";
import { DashboardDataTable } from "@/components/dasboard/DashboardDataTable";
import { getDashboardSummary } from "@/api/dashboard";
import type { ITicket } from "@/api/ticket";
import type { IStatus } from "@/api/status";
import type { IPriority } from "@/api/priority";
import type { ITicketType } from "@/api/tickettype";
import { TableSpinner } from "@/components/ui/spinner";
import { GlobalAlert } from "@/components/ui/GlobalAlert";

export function Dashboard() {
    const [statusList, setStatusList] = useState<IStatus[]>([]);
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedYearBar, setSelectedYearBar] = useState<string>("");
    const [selectedYearPie, setSelectedYearPie] = useState<string>("");
    const [priorities, setPriorities] = useState<IPriority[]>([]);
    const [selectedYearPriorityPie, setSelectedYearPriorityPie] = useState<string>("");
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [ticketTypes, setTicketTypes] = useState<ITicketType[]>([]);
    const [selectedYearLine, setSelectedYearLine] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        getDashboardSummary()
            .then(({ tickets, statusList, priorities, ticketTypes }) => {
                setStatusList(statusList);
                setTickets(tickets);
                setPriorities(priorities);
                setTicketTypes(ticketTypes);
                setAlert(null);
            })
            .catch(() => {
                setStatusList([]);
                setTickets([]);
                setPriorities([]);
                setTicketTypes([]);
                setAlert({ type: "error", message: "Não foi possível retornar os dados do dashboard." });
            })
            .finally(() => setLoading(false));
    }, []);

    // Anos disponíveis para filtro (agora usando todos os tickets com dataFechamento)
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

    // Seleciona o ano mais recente por padrão para todos os filtros
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
                setSelectedYearBar(String(years[0]));
                setSelectedYearPie(String(years[0]));
                setSelectedYearPriorityPie(String(years[0]));
                setSelectedYearLine(String(years[0]));
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

    // KPI de chamados sem status definido
    const undefinedStatusCount = tickets.filter(t => !t.idStatus || !statusList.some(s => s.idStatus === t.idStatus)).length;

    const ticketsByStatus = [
        ...statusList.map((status) => {
            const count = tickets.filter(t =>
                t.idStatus === status.idStatus
            ).length;
            return {
                ...status,
                count,
            };
        }),
        {
            idStatus: -1,
            nomeStatus: "Não atribuído",
            hexCorPrimaria: "#888",
            hexCorSecundaria: "#ccc",
            ativo: 1,
            count: undefinedStatusCount,
        }
    ];

    const ticketsByStatusForYear = [
        ...statusList.map((status) => {
            const count = tickets.filter(t => {
                if (!t.dataAbertura) return false;
                const d = new Date(t.dataAbertura);
                return selectedYearPie && d.getFullYear() === Number(selectedYearPie) && t.idStatus === status.idStatus;
            }).length;
            return {
                tipochamado: status.nomeStatus,
                quantity: count,
                fill: status.hexCorPrimaria || "#888"
            };
        }),
        // Fatia para chamados sem status definido
        (() => {
            const count = tickets.filter(t => {
                if (!t.dataAbertura) return false;
                const d = new Date(t.dataAbertura);
                return (
                    selectedYearPie &&
                    d.getFullYear() === Number(selectedYearPie) &&
                    (!t.idStatus || !statusList.some(s => s.idStatus === t.idStatus))
                );
            }).length;
            return {
                tipochamado: "Não atribuído",
                quantity: count,
                fill: "#888"
            };
        })()
    ].filter(item => item.quantity > 0);

    const ticketsByPriorityForYear = priorities.map((priority) => {
        const count = tickets.filter(t => {
            if (!t.dataAbertura) return false;
            const d = new Date(t.dataAbertura);
            return selectedYearPriorityPie && d.getFullYear() === Number(selectedYearPriorityPie) && t.idPrioridade === priority.idPrioridade;
        }).length;
        return {
            tipochamado: priority.nomePrioridade,
            quantity: count,
            fill: priority.hexCorPrimaria || "#888"
        };
    }).filter(item => item.quantity > 0);

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
        <div className="flex flex-col h-full gap-4 md:gap-8 w-full">
            {alert && (
                <div className="fixed bottom-4 right-4 z-50">
                    <GlobalAlert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                </div>
            )}
            <div className="flex flex-col gap-2 md:gap-4 justify-between px-2 md:px-0">
                <h1 className="title-h1 text-slate-950 dark:text-white">
                    Dashboard
                </h1>
                <h3 className="title-h3 text-slate-700 dark:text-slate-300">
                    Indicadores históricos por status de demandas
                </h3>
            </div>
            {loading ? (
                <div className="absolute left-1/2 -translate-x-1/2 top-1/3 flex flex-col items-center justify-center w-full min-h-[400px]">
                    <TableSpinner size={48} />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                                    md:flex md:flex-wrap gap-4 md:gap-6 w-full px-2 md:px-0">
                        {ticketsByStatus.map((status) => (
                            <KpiCard
                                key={status.idStatus}
                                kpiTitle={status.nomeStatus}
                                kpiValue={status.count.toString()}
                                kpiLink={status.idStatus !== -1 ? `/admin/assigned-tickets?status=${status.idStatus}` : `/admin/open-tickets`}
                                kpiColor={status.hexCorPrimaria}
                            />
                        ))}
                    </div>
                    <h3 className="title-h3 text-slate-700 dark:text-slate-300 px-2 md:px-0">
                        Parâmetros acumulados</h3>
                    <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4 md:gap-8 items-center w-full px-2 md:px-0">
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
                            years={closedTicketYears}
                            selectedYear={selectedYearPie}
                            onYearChange={setSelectedYearPie}
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
                            years={closedTicketYears}
                            selectedYear={selectedYearPriorityPie}
                            onYearChange={setSelectedYearPriorityPie}
                        />
                        <ChartLine
                            chartData={lineChartData}
                            chartConfig={lineChartConfig}
                            cardTitle="Demandas por Tipo de Chamado"
                            cardDescription="Gráfico de linhas mostrando demandas port tipo de chamado ao longo dos meses"
                            years={closedTicketYears}
                            selectedYear={selectedYearLine}
                            onYearChange={setSelectedYearLine}
                        />
                    </div>
                    <div className="flex flex-col gap-2 md:gap-4 px-2 md:px-0">
                        <h3 className="title-h3 text-slate-700 dark:text-slate-300">
                            Analistas e Demandas</h3>
                        <DashboardDataTable />
                    </div>
                </>
            )}
        </div>
    );
}