import { useUser } from "@/contexts/UserContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus, CircleCheckBig } from "lucide-react";
import { SettingsUserForm } from "@/components/settings/SettingsUserForm";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export function Settings() {
    const { user } = useUser();
    const name = user?.nome || "Usuário";
    const avatarUrl = user?.fotoPerfil || undefined;

    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [lastSavedPreview, setLastSavedPreview] = useState<string | null>(null);

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
            window.dispatchEvent(new CustomEvent("profile-photo-preview", { detail: { previewUrl: url } }));
            return () => {
                URL.revokeObjectURL(url);
                window.dispatchEvent(new CustomEvent("profile-photo-preview", { detail: { previewUrl: null } }));
            };
        } else {
            setPreviewUrl(null);
            window.dispatchEvent(new CustomEvent("profile-photo-preview", { detail: { previewUrl: null } }));
        }
    }, [selectedFile]);

    const handleProfilePhotoUploaded = (fotoPerfilUrl?: string, previewUrl?: string) => {
        if (fotoPerfilUrl && previewUrl) {
            setLastSavedPreview(previewUrl);
            setSelectedFile(null);
            setPreviewUrl(previewUrl);
            window.dispatchEvent(new CustomEvent("profile-photo-preview", { detail: { previewUrl } }));
        } else if (fotoPerfilUrl) {
            setLastSavedPreview(fotoPerfilUrl);
            setSelectedFile(null);
            setPreviewUrl(null);
            window.dispatchEvent(new CustomEvent("profile-photo-preview", { detail: { previewUrl: fotoPerfilUrl } }));
        } else {
            setLastSavedPreview(previewUrl ?? null);
            window.dispatchEvent(new CustomEvent("profile-photo-preview", { detail: { previewUrl: previewUrl || lastSavedPreview } }));
        }
    };

    const handleCancelPhoto = () => {
        setSelectedFile(null);
        setPreviewUrl(lastSavedPreview);
        window.dispatchEvent(new CustomEvent("profile-photo-preview", { detail: { previewUrl: lastSavedPreview } }));
    };

    return (
        <div className="flex flex-col gap-10">
            {alert && (
                <div className="fixed bottom-4 right-4 z-50">
                    <GlobalAlert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                </div>
            )}
            <div>
                <h1 className="title-h1 text-slate-950 dark:text-white">Configurações</h1>
                <h2 className="title-h3 text-slate-700 dark:text-slate-300">Aqui você pode editar os dados da sua conta.</h2>
            </div>
            <header className="flex items-center gap-4">
                <div className="relative">
                    <Avatar className="h-24 w-24">
                        {previewUrl
                            ? <AvatarImage src={previewUrl} alt={name} />
                            : lastSavedPreview
                                ? <AvatarImage src={lastSavedPreview} alt={name} />
                                : avatarUrl
                                    ? <AvatarImage src={avatarUrl} alt={name} />
                                    : (
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
                                    )
                        }
                    </Avatar>
                    <label className="absolute bottom-0 right-0 cursor-pointer bg-white dark:bg-slate-800 rounded-full p-1 shadow-md border border-slate-200 dark:border-slate-700">
                        <ImagePlus className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                        <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => {
                                handleCancelPhoto(); // limpa preview anterior se trocar a foto antes de salvar
                                if (e.target.files && e.target.files[0]) {
                                    setSelectedFile(e.target.files[0]);
                                }
                            }}
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
                    onProfilePhotoUploaded={handleProfilePhotoUploaded}
                    setPreviewUrl={setPreviewUrl}
                />
            </main>
        </div>
    )
}