import { Button } from "@/components/ui/button";
import { Link }  from "react-router-dom"; 

interface KpiCardProps {
    kpiTitle: string;
    kpiValue: string | number;
    kpiColor?: string;
    kpiLink?: string;
    onDetailsClick?: () => void;
}

export function KpiCard({ kpiTitle, kpiValue, kpiColor, onDetailsClick }: KpiCardProps) {
    return (
        <div
            className="rounded-lg shadow-md p-6 flex flex-col items-start min-w-[512px] max-w-fit bg-white"
            style={kpiColor ? { borderLeft: `8px solid ${kpiColor}` } : {}}
        >
            <span className="text-lg font-semibold mb-2">{kpiTitle}</span>
            <span className="text-3xl font-bold mb-4" style={kpiColor ? { color: kpiColor } : {}}>
                {kpiValue}
            </span>
            <Link
                className="p-0 h-auto text-sm"
                navigate={onDetailsClick}
            >
                Ver detalhes
            </Link>
        </div>
    );
}