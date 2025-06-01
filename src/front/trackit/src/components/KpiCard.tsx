import { Link } from "react-router";

export default function KpiCard({ kpiTitle, kpiValue, kpiLink, kpiColor }: {
    kpiTitle: string;
    kpiValue: string | number;
    kpiLink?: string;
    kpiColor?: string;
}) {
    return (
        <div className="w-[40rem] flex items-center justify-start gap-4 p-4 bg-white rounded-lg shadow-md border border-slate-200">
            <span
                className={`w-1 h-full rounded-sm ${kpiColor}`}
                style={{ backgroundColor: kpiColor }}
            ></span>
            <div className="flex flex-col items-start justify-start gap-2">
                <h3 className="title-h3 text-slate-700">{kpiTitle}</h3>
                <p className="title-h2 text-slate-800">{kpiValue}</p>
                {kpiLink && (
                    <Link to={kpiLink} className="paragraph-base hover:underline">
                        Ver detalhes
                    </Link>
                )}
            </div>
        </div>
    );

}