import { API_BASE_URL } from "@/api/config";
import { authHeaders } from "@/contexts/helperCookies";

export async function markAllNotificationsAsRead(idUsuario: number, idChamado: number): Promise<void> {
    const response = await fetch(
        `${API_BASE_URL}/notifications/read-all/${idUsuario}/${idChamado}`,
        {
            method: "PATCH",
            headers: authHeaders({ "Content-Type": "application/json" }),
        }
    );
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error || "Erro ao marcar notificações como lidas");
    }
}

export async function getUnreadChamados(idUsuario: number): Promise<number[]> {
    const response = await fetch(
        `${API_BASE_URL}/notifications/unread-chamados/${idUsuario}`,
        {
            headers: authHeaders()
        }
    );
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error || "Erro ao buscar chamados com notificações não lidas");
    }
    return response.json();
}
