import { KpiCard } from "@/components/KpiCard"
import { ChartBar } from "@/components/ui/ChartBar"
import { ChartPie } from "@/components/ui/PieChart"

export function Dashboard() {
    return (
        <div className="flex flex-col w-full h-full gap-y-8">
            <div className="flex gap-4 justify-between">
                <h1 className="title-h1 text-slate-950">
                    Dashboard
                </h1>
            </div>
            <div className="flex flex-wrap gap-8 items-center">
                <KpiCard
                    kpiTitle="Chamados resolvidos"
                    kpiValue="150"
                    kpiLink="../"
                    kpiColor="#16A34A"
                />
                <KpiCard
                    kpiTitle="Chamados em aberto"
                    kpiValue="150"
                    kpiLink="../"
                    kpiColor="#64748B"
                />
                <KpiCard
                    kpiTitle="Chamados aguardando resposta"
                    kpiValue="150"
                    kpiLink="../"
                    kpiColor="#0EA5E9"
                />
                <KpiCard
                    kpiTitle="Chamados em análise"
                    kpiValue="150"
                    kpiLink="../"
                    kpiColor="#FACC15"
                />
            </div>
            <div className="flex flex-wrap gap-8 items-center">
                <ChartBar
                    chartData={[
                        { month: "January", desktop: 320 },
                        { month: "February", desktop: 250 },
                        { month: "March", desktop: 180 },
                        { month: "April", desktop: 300 },
                        { month: "May", desktop: 220 },
                        { month: "June", desktop: 250 },
                        { month: "July", desktop: 300 },
                        { month: "August", desktop: 280 },
                        { month: "September", desktop: 310 },
                        { month: "October", desktop: 330 },
                        { month: "November", desktop: 250 },
                        { month: "December", desktop: 400 },
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
                        { tipochamado: "Resolvidos", quantidade: 150, fill: "var(--chart-6)" },
                        { tipochamado: "Em aberto", quantidade: 150, fill: "var(--chart-7)" },
                        { tipochamado: "Aguardando resposta", quantidade: 150, fill: "var(--chart-8)" },
                        { tipochamado: "Em análise", quantidade: 150, fill: "var(--chart-9)" },
                    ]}
                    chartConfig={{
                        quantidade: {
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
            </div>
        </div>
    )
}