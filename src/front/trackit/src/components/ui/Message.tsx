import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface MessageProps {
    nome: string;
    gerencia?: string;
    horaFormatada: string;
    text: string;
    isCurrentUser: boolean;
    avatarImg?: string | null;
}

function getInitials(nome: string) {
    if (!nome) return "";
    return nome
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export function Message({ nome, gerencia, horaFormatada, text, isCurrentUser, avatarImg }: MessageProps) {
    return (
        <div className={`flex flex-col gap-1 ${isCurrentUser ? "items-end" : "items-start"}`}>
            <div className={`flex items-start gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}>
                <Avatar className="w-8 h-8">
                    {avatarImg ? (
                        <AvatarImage src={avatarImg} alt={nome} />
                    ) : (
                        <AvatarFallback>{getInitials(nome)}</AvatarFallback>
                    )}
                </Avatar>
                <div className="flex-1 flex" style={isCurrentUser ? { justifyContent: "flex-end" } : {}}>
                    <div
                        className={`rounded-lg px-5 py-3 text-sm whitespace-pre-line break-words w-auto max-w-[80vw] md:max-w-[480px] ${isCurrentUser
                            ? "bg-sky-700 text-white"
                            : "bg-slate-900 dark:bg-slate-700 text-white"
                            }`}
                        style={{ display: "inline-block" }}
                    >
                        {text}
                    </div>
                </div>
            </div>
            <div
                className={`flex gap-2 px-11 text-xs ${isCurrentUser ? "justify-end text-right" : "justify-start text-left"
                    }`}
            >
                <span className="text-slate-700 font-medium dark:text-slate-200">{nome}</span>
                {gerencia && (
                    <>
                        <span className="inline-block align-middle dark:text-slate-400">|</span>
                        <span className="text-slate-700 dark:text-slate-300">{gerencia}</span>
                    </>
                )}
                <span className="inline-block align-middle dark:text-slate-400">|</span>
                <span className="text-slate-500 dark:text-slate-400">{horaFormatada}</span>
            </div>
        </div>
    );
}
