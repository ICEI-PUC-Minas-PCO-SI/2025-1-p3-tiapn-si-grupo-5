import { useUser } from "@/contexts/UserContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus } from "lucide-react";
import { UploadButton } from "@/components/ui/UploadButton";

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
                <div className="flex flex-col">
                    <UploadButton>
                        {/*TODO: AJUSTAR COMPORTAMENTO DO BOTÃO*/}
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
            </main>
        </div>
    )
}