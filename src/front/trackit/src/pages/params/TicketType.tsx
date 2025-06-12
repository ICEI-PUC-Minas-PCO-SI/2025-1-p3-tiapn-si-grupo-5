import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TicketTypeParams } from "@/components/params/TicketTypeParams";

export function TicketType() {
    const [isAdding, setIsAdding] = useState(false);

    return (
        <div className="flex flex-col gap-6">
            <h1 className="title-h1 text-slate-950 dark:text-white">Gerenciar Parâmetros</h1>
            <div className="border-2 p-4 rounded mb-6">
                <div className="flex justify-between">
                    <h2 className="title-h2 text-slate-700 dark:text-slate-300">Editar tipos de demanda</h2>
                    <Button className="w-38 mr-6" onClick={() => setIsAdding(true)}>
                        + Adicionar
                    </Button>
                </div>
                <TicketTypeParams isAdding={isAdding} setIsAdding={setIsAdding} />
            </div>
        </div>
    );
}