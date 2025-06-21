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
        <div className="flex flex-col gap-[2rem]">
            {alert && (
                <GlobalAlert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            <header className="max-w-[51.4rem]">
                <h1 className="title-h1 text-slate-950 dark:text-white">Abrir Chamado</h1>
                <h3 className="title-h3 text-slate-700 dark:text-slate-300">Preencha o chamado com as informações solicitadas</h3>
            </header>
            <main>
                <OpenTicketForm setAlert={setAlert} />
            </main>
        </div>
    );
}