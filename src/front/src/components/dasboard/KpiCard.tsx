import { NavLink } from "react-router-dom";

interface KpiCardProps {
    kpiTitle: string;
    kpiValue: string | number;
    kpiColor?: string;
    kpiLink?: string;
}

export function KpiCard({ kpiTitle, kpiValue, kpiColor, kpiLink }: KpiCardProps) {
    return (
        <div
            className="rounded-lg shadow-md p-6 flex flex-col items-start min-w-[512px] max-w-fit bg-white dark:bg-slate-900"
            style={kpiColor ? { borderLeft: `8px solid ${kpiColor}` } : {}}
        >
            <span className="text-lg font-semibold mb-2 text-slate-700 dark:text-slate-300">{kpiTitle}</span>
            <span className="text-3xl font-bold mb-4" style={kpiColor ? { color: kpiColor } : {}}>
                {kpiValue}
            </span>
            {kpiLink && (
                <NavLink
                    to={kpiLink}
                    className="text-slate-700 hover:underline text-sm font-medium mt-2 dark:text-slate-300"
                    style={{ padding: 0, height: "auto" }}
                >
                    Ver detalhes
                </NavLink>
            )}
        </div>
    );
}