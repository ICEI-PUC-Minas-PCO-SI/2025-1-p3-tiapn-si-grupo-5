import { useState, useEffect } from "react";
import { OpenTicketForm } from "@/components/openticket/OpenTicketForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";

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
                <div className="fixed bottom-4 right-4 z-50">
                    <Alert
                        variant={alert.type === "success" ? "success" : "destructive"}
                        className="flex items-center justify-between space-x-4"
                    >
                        <div>
                            <AlertTitle>{alert.type === "success" ? "Sucesso" : "Erro"}</AlertTitle>
                            <AlertDescription>{alert.message}</AlertDescription>
                        </div>
                        <button
                            onClick={() => setAlert(null)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Fechar alerta"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </Alert>
                </div>
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