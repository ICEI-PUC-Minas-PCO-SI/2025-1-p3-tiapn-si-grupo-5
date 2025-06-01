import { KpiCard } from "@/components/KpiCard"

export function Dashboard() {
    return (
        <div className="flex flex-col w-full h-full gap-4 p-4">
            <h1 className="title-h1 text-slate-950">Dashboard</h1>
            <div className="flex flex-wrap gap-8">
                <KpiCard
                    kpiTitle="Chamados resolvidos"
                    kpiValue="150"
                    kpiLink="/"
                    kpiColor="#46be00"
                />
                <KpiCard
                    kpiTitle="Chamados resolvidos"
                    kpiValue="150"
                    kpiLink="/"
                    kpiColor="#46be00"
                />
                <KpiCard
                    kpiTitle="Chamados resolvidos"
                    kpiValue="150"
                    kpiLink="/"
                    kpiColor="#46be00"
                />
                <KpiCard
                    kpiTitle="Chamados resolvidos"
                    kpiValue="150"
                    kpiLink="/"
                    kpiColor="#46be00"
                />
            </div>
        </div>
    )
}