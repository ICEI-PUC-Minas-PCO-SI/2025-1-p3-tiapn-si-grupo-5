import { useUser } from "@/contexts/UserContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus, CircleCheckBig } from "lucide-react";   
import { SettingsUserForm } from "@/components/settings/SettingsUserForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export function Settings() {
    const { user } = useUser();
    const name = user?.nome || "Usuário";
    const avatarUrl = user?.fotoPerfil || undefined;

    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    useEffect(() => {
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [selectedFile]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

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
                <h1 className="title-h1 text-slate-950 dark:text-white">Configurações</h1>
                <h2 className="title-h3 text-slate-700 dark:text-slate-300">Aqui você pode editar os dados da sua conta.</h2>
            </div>
            <header className="flex items-center gap-4">
                <div className="relative">
                    <Avatar className="h-24 w-24">
                        {previewUrl ? (
                            <AvatarImage src={previewUrl} alt={name} />
                        ) : avatarUrl ? (
                            <AvatarImage src={avatarUrl} alt={name} />
                        ) : (
                            <AvatarFallback>
                                {
                                    name
                                        .split(" ")
                                        .map((n: string) => n[0])
                                        .join("")
                                        .toUpperCase()
                                        .slice(0, 2)
                                }
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <label className="absolute bottom-0 right-0 cursor-pointer bg-white rounded-full p-1 shadow-md border border-slate-200">
                        <ImagePlus className="w-5 h-5 text-slate-700" />
                        <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <div className="flex flex-col gap-4">
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
                <SettingsUserForm
                    onFeedback={(type, message) => setAlert({ type, message })}
                    profilePhotoFile={selectedFile}
                    onProfilePhotoUploaded={() => setSelectedFile(null)}
                    setPreviewUrl={setPreviewUrl}
                />
            </main>
        </div>
    )
}