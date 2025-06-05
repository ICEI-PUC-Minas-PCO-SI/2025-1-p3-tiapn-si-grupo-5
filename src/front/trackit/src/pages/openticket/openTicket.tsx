import { useState, useEffect } from "react";
import { OpenTicketForm } from "@/components/openticket/OpenTicketForm";
import { GlobalAlert } from "@/components/ui/GlobalAlert";

export function OpenTicket() {
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <div className="flex flex-col gap-[2rem]">
            {alert && (
                <GlobalAlert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            <header className="max-w-[51.4rem]">
                <h1 className="title-h1 text-slate-950">Abrir Chamado</h1>
                <h3 className="title-h3 text-slate-700">Preencha o chamado com as informações solicitadas</h3>
            </header>
            <main>
                <OpenTicketForm setAlert={setAlert} />
            </main>
        </div>
    );
}