import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { VscKey } from "react-icons/vsc";
import { useState } from "react";
import { z } from "zod";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "@/api/auth";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import clsx from "clsx";

const schema = z.object({
    senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    confirmarSenha: z.string(),
}).refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
});

export function ResetPassword() {
    const [isShow, setIsShow] = useState(false);
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token") || "";

    const handlePassword = () => setIsShow((v) => !v);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const result = schema.safeParse({ senha, confirmarSenha });
        if (!result.success) {
            setAlert({ type: "error", message: result.error.errors[0].message });
            return;
        }
        if (!token) {
            setAlert({ type: "error", message: "Token de redefinição inválido." });
            return;
        }
        setLoading(true);
        try {
            await resetPassword(token, senha);
            setAlert({ type: "success", message: "Senha redefinida com sucesso! Redirecionando para login..." });
            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (err: unknown) {
            let msg = "Erro ao redefinir senha.";
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
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Redefinir senha</h1>
                    <p className="text-base text-slate-700 dark:text-slate-300 text-center">
                        Digite sua nova senha abaixo.
                    </p>
                </div>
                <div>
                    <label className="block mb-1 text-slate-800 dark:text-slate-200 font-medium">Nova senha:</label>
                    <div className="relative">
                        <Input
                            className="input-layout pr-10 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                            type={isShow ? "text" : "password"}
                            placeholder="Digite sua nova senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={handlePassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 dark:text-slate-300 focus:outline-0"
                            tabIndex={-1}
                        >
                            {!isShow ? <IoEyeOutline size={24} /> : <IoEyeOffOutline size={24} />}
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block mb-1 text-slate-800 dark:text-slate-200 font-medium">Confirmar senha:</label>
                    <div className="relative">
                        <Input
                            className="input-layout pr-10 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                            type={isShow ? "text" : "password"}
                            placeholder="Digite novamente a senha"
                            value={confirmarSenha}
                            onChange={e => setConfirmarSenha(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={handlePassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 dark:text-slate-300 focus:outline-0"
                            tabIndex={-1}
                        >
                            {!isShow ? <IoEyeOutline size={24} /> : <IoEyeOffOutline size={24} />}
                        </button>
                    </div>
                </div>
                <Button className="btn-layout" type="submit" disabled={loading}>
                    {loading ? "Salvando..." : "Trocar senha"}
                </Button>
            </form>
        </div>
    );
}