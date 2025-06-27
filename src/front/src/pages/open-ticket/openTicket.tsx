import { useState, useEffect } from "react";
import { OpenTicketForm } from "@/components/open-ticket/OpenTicketForm";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import { useNavigate } from "react-router-dom";

export function OpenTicket() {
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (alert?.type === "success") {
            const timer = setTimeout(() => {
                setAlert(null);
                navigate("/user/my-tickets");
            }, 1200);
            return () => clearTimeout(timer);
        }
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert, navigate]);

    return (
        <div className="flex flex-col gap-4 md:gap-8 px-2 md:px-0">
            {alert && (
                <GlobalAlert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            <header className="max-w-full md:max-w-[51.4rem]">
                <h1 className="title-h1 text-slate-950 dark:text-white text-xl md:text-2xl lg:text-3xl">Abrir Chamado</h1>
                <h3 className="title-h3 text-slate-700 dark:text-slate-300 text-sm md:text-base">Preencha o chamado com as informações solicitadas</h3>
            </header>
            <main className="w-full">
                <OpenTicketForm setAlert={setAlert} />
            </main>
        </div>
    );
}