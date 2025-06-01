import { Link } from "react-router";

export function KpiCard({ kpiTitle, kpiValue, kpiLink, kpiColor }: {
    kpiTitle: string;
    kpiValue: string | number;
    kpiLink?: string;
    kpiColor?: string;
}) {
    return (
        <div className="w-[32rem] flex items-center justify-start gap-4 p-4 bg-white rounded-lg shadow-md border border-slate-200 relative">
            <span
                className="w-2 absolute top-0 left-0 bottom-0 rounded-l-md"
                style={{ backgroundColor: kpiColor }}
            ></span>
            <div className="flex flex-col items-start justify-start gap-2 pl-4">
                <h3 className="title-h3 text-slate-700">{kpiTitle}</h3>
                <p className="title-h2 text-slate-800"
                >
                    {kpiValue}
                </p>
                {kpiLink && (
                    <Link to={kpiLink} className="paragraph-base hover:underline">
                        Ver detalhes
                    </Link>
                )}
            </div>
        </div>
    );
}