import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Paperclip, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MessageProps {
    nome: string;
    gerencia?: string;
    horaFormatada: string;
    text: string;
    isCurrentUser: boolean;
    avatarImg?: string | null;
    anexoUrl?: string | null;
    anexoNome?: string | null;
    onDownloadAnexo?: () => void;
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

export function Message({
    nome,
    gerencia,
    horaFormatada,
    text,
    isCurrentUser,
    avatarImg,
    anexoUrl,
    anexoNome,
    onDownloadAnexo,
}: MessageProps) {
    const [downloading, setDownloading] = useState(false);

    async function handleDownload() {
        if (!anexoUrl || !anexoNome) return;
        setDownloading(true);
        try {
            const response = await fetch(anexoUrl);
            if (!response.ok) throw new Error("Erro ao baixar arquivo");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = anexoNome;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (e) {
            if (onDownloadAnexo) onDownloadAnexo();
            console.error("Erro ao baixar anexo:", e);
        } finally {
            setDownloading(false);
        }
    }

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
                        {anexoUrl && anexoNome && (
                            <Button
                                type="button"
                                variant="outline"
                                className="mt-3 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors w-fit min-h-0 h-8 px-3 py-0 hover:bg-slate-100 dark:hover:bg-slate-700"
                                style={{
                                    textDecoration: "none",
                                    boxShadow: "none",
                                    fontWeight: 500,
                                }}
                                onClick={handleDownload}
                                disabled={downloading}
                            >
                                <div className="flex items-center gap-2">
                                    <Paperclip className="w-4 h-4 text-sky-700 dark:text-sky-400" />
                                    <span className="font-medium text-slate-900 dark:text-slate-100 text-xs truncate max-w-[90px]">
                                        {anexoNome}
                                    </span>
                                </div>
                                <Download className="w-4 h-4" />
                            </Button>
                        )}
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