import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VscKey } from "react-icons/vsc";
import { useState } from "react";
import { z } from "zod";
import { requestPasswordReset } from "@/api/auth";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import clsx from "clsx";

const schema = z.object({
    email: z.string().email("E-mail inválido"),
});

export function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const result = schema.safeParse({ email });
        if (!result.success) {
            setAlert({ type: "error", message: "Preencha um e-mail válido." });
            return;
        }
        setLoading(true);
        try {
            await requestPasswordReset(email);
            setAlert({
                type: "success",
                message: "Você receberá um link para redefinir sua senha por e-mail. Verifique sua caixa de entrada.",
            });
        } catch (err: unknown) {
            let msg = "Erro ao solicitar redefinição.";
            if (
                typeof err === "object" &&
                err !== null &&
                "message" in err &&
                typeof (err as { message?: unknown }).message === "string"
            ) {
                msg = (err as { message: string }).message;
            }
            setAlert({ type: "error", message: msg });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={clsx(
            "flex flex-col min-h-screen items-center justify-center px-4 py-8",
            "bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
        )}>
            {alert && (
                <div className="fixed bottom-4 right-4 z-50">
                    <GlobalAlert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                </div>
            )}
            <form
                className={clsx(
                    "w-full max-w-md flex flex-col gap-6 p-8 rounded-lg shadow-lg",
                    "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                )}
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col items-center gap-2">
                    <VscKey className="w-16 h-16 text-cyan-800 dark:text-cyan-400 -scale-x-100 rotate-45" />
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Esqueceu a senha?</h1>
                    <p className="text-base text-slate-700 dark:text-slate-300 text-center">
                        Não se preocupe. Vamos encaminhar as instruções de troca de senha através do seu e-mail cadastrado.
                    </p>
                </div>
                <div>
                    <label className="block mb-1 text-slate-800 dark:text-slate-200 font-medium">E-mail:</label>
                    <Input
                        className="input-layout bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <Button className="btn-layout" type="submit" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar verificação"}
                </Button>
            </form>
        </div>
    );
}