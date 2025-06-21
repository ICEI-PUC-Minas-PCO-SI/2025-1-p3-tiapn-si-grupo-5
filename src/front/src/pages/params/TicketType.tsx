import { TicketTypeParams } from "@/components/params/TicketTypeParams";

export function TicketType() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="title-h1 text-slate-950 dark:text-white">Tipos de Demanda</h1>
            <TicketTypeParams />
        </div>
    );
}