import { useUser } from "@/contexts/UserContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus, CircleCheckBig } from "lucide-react";
import { UploadButton } from "@/components/ui/UploadButton";

{/* TODO: UPLOAD DE IMG */}

export function Settings() {
    const { user } = useUser();
    const name = user?.nome || "Usuário";
    const avatarUrl = undefined;
    return (
        <div className="flex flex-col gap-8">
            <h1 className="title-h1">Configurações</h1>
            <header className="flex items-center gap-4">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={avatarUrl} alt={name} />
                    <AvatarFallback>
                        {name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-4">
                    <UploadButton size="fit">
                        <ImagePlus className="mr-2" />
                        Enviar foto
                    </UploadButton>
                    <p className="menu-2 text-slate-700">
                        Você pode fazer upload de uma imagem para usar de foto de perfil
                        de até X mb.
                    </p>
                </div>
            </header>
            <main>
                <div className="flex gap-3 items-center">
                    {user!.tipo === 1 ? (
                        <>
                            <CircleCheckBig className="inline-block text-green-600" />
                            <p className="menu-2 text-green-600">
                                Gestor da Astin
                            </p>
                        </>
                    ) : user!.tipo === 2 ? (
                        <>
                            <CircleCheckBig className="inline-block text-green-600" />
                            <p className="menu-2 text-green-600">
                                Analista da Astin
                            </p>
                        </>
                    ) : null}
                </div>
            </main>
        </div>
    )
}