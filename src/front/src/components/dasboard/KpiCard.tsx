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
            className="rounded-lg shadow-md p-4 md:p-6 flex flex-col items-start 
                       flex-1 min-w-0 md:min-w-[512px] md:max-w-fit md:flex-none
                       bg-white dark:bg-slate-900"
            style={kpiColor ? { borderLeft: `8px solid ${kpiColor}` } : {}}
        >
            <span className="text-base md:text-lg font-semibold mb-2 text-slate-700 dark:text-slate-300 
                           truncate md:truncate-none w-full md:w-auto">{kpiTitle}</span>
            <span className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 
                           truncate md:truncate-none w-full md:w-auto"
                style={kpiColor ? { color: kpiColor } : {}}>
                {kpiValue}
            </span>
            {kpiLink && (
                <NavLink
                    to={kpiLink}
                    className="text-slate-700 hover:underline text-sm font-medium mt-2 dark:text-slate-300 
                             truncate md:truncate-none w-full md:w-auto"
                    style={{ padding: 0, height: "auto" }}
                >
                    Ver detalhes
                </NavLink>
            )}
        </div>
    );
}