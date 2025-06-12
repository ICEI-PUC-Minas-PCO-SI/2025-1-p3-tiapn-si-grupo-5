import { API_BASE_URL } from "@/api/config";
import { authHeaders } from "@/contexts/helperCookies";

export interface ChatMessage {
    idMensagem: number;
    mensagem: string;
    timestamp: string;
    remetente: "usuario" | "analista";
    idRemetente: number;
    urlAnexo?: string | null;
    nomeArquivo?: string | null;
}

export async function getChatMessages(idChamado: number): Promise<ChatMessage[]> {
    const response = await fetch(`${API_BASE_URL}/chats/${idChamado}/messages`, {
        headers: authHeaders()
    });
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error || "Erro ao buscar mensagens do chat");
    }
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Formato inesperado de mensagens");
    return data;
}
