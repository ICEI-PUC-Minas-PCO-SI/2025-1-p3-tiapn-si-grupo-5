import { useUser } from "@/contexts/UserContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus, CircleCheckBig } from "lucide-react";
import { UploadButton } from "@/components/ui/UploadButton";
import { SettingsUserForm } from "@/components/SettingsUserForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export function Settings() {
    const { user } = useUser();
    const name = user?.nome || "Usuário";
    const avatarUrl = user?.fotoPerfil || undefined;

    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <div className="flex flex-col gap-10">
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
            <div>
                <h1 className="title-h1 text-slate-950">Configurações</h1>
                <h2 className="title-h3 text-slate-700">Aqui você pode editar os dados da sua conta.</h2>
            </div>
            <header className="flex items-center gap-4">
                <Avatar className="h-24 w-24">
                    {avatarUrl ? (
                        <AvatarImage src={avatarUrl} alt={name} />
                    ) : (
                        <AvatarFallback>
                            {name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)}
                        </AvatarFallback>
                    )}
                </Avatar>
                <div className="flex flex-col gap-4">
                    <UploadButton size="fit">
                        <ImagePlus className="mr-2" />
                        Enviar foto
                    </UploadButton>
                    <div className="flex gap-3 items-center">
                        {user?.tipo === 1 ? (
                            <>
                                <CircleCheckBig className="inline-block text-green-600" />
                                <p className="menu-2 text-green-600">
                                    Gestor da Astin
                                </p>
                            </>
                        ) : user?.tipo === 2 ? (
                            <>
                                <CircleCheckBig className="inline-block text-green-600" />
                                <p className="menu-2 text-green-600">
                                    Analista da Astin
                                </p>
                            </>
                        ) : null}
                    </div>
                </div>
            </header>
            <main className="flex flex-col">
                <SettingsUserForm onFeedback={(type, message) => setAlert({ type, message })} />
            </main>
        </div>
    )
}