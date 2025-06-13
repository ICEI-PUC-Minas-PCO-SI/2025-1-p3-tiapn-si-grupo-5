import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";

export type GlobalAlertType = "success" | "error";

export interface GlobalAlertProps {
    type: GlobalAlertType;
    message: string;
    onClose: () => void;
}

export function GlobalAlert({ type, message, onClose }: GlobalAlertProps) {
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => onClose(), 3000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Alert
                variant={type === "success" ? "success" : "destructive"}
                className="flex items-center justify-between space-x-4 dark:bg-slate-900 dark:text-white"
            >
                <div>
                    <AlertTitle className="dark:text-white">{type === "success" ? "Sucesso" : "Erro"}</AlertTitle>
                    <AlertDescription className="dark:text-slate-200">{message}</AlertDescription>
                </div>
                <button
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground transition-colors dark:text-white"
                    aria-label="Fechar alerta"
                >
                    <X className="w-4 h-4" />
                </button>
            </Alert>
        </div>
    );
}
