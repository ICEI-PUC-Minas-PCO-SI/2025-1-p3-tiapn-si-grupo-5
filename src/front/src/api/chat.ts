import { API_BASE_URL } from "@/api/config";

export interface ChatMessage {
    idMensagem: number;
    mensagem: string;
    timestamp: string;
    remetente: "usuario" | "analista" | "gestor";
    idRemetente: number;
    urlAnexo?: string | null;
    nomeArquivo?: string | null;
    usuario?: {
        nomeUsuario: string;
        fotoPerfil?: string | null;
        gerencia?: {
            nomeGerencia: string;
        } | null;
    };
}

export async function getChatMessages(idChamado: number): Promise<ChatMessage[]> {
    const response = await fetch(`${API_BASE_URL}/chats/${idChamado}/messages`, {
        credentials: 'include'
    });
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error || "Erro ao buscar mensagens do chat");
    }
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Formato inesperado de mensagens");
    return data;
}
