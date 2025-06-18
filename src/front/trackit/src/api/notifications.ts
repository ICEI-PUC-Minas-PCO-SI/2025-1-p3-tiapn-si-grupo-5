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
