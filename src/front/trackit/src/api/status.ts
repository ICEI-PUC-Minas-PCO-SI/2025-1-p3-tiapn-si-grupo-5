export interface IStatus {
    idStatus: number;
    nomeStatus: string;
    hexCorPrimaria: string;
    hexCorSecundaria: string;
    ativo: number;
}

export async function getAllStatus(): Promise<IStatus[]> {
    try {
        const response = await fetch("http://localhost:3000/statuses");
        if (!response.ok) {
            throw new Error("Erro ao buscar status");
        }
        const statuses = await response.json();
        return statuses;
    } catch (error) {
        console.error("Erro ao buscar status", error);
        throw error;
    }
}

export async function addStatus(nomeStatus: string, color: string): Promise<IStatus> {
    const response = await fetch("http://localhost:3000/statuses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomeStatus, color }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao adicionar status.");
    }
    return response.json();
}

export async function updateStatus(idStatus: number, nomeStatus: string, color: string): Promise<IStatus> {
    const response = await fetch(`http://localhost:3000/statuses/${idStatus}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomeStatus, color }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar status.");
    }
    return response.json();
}

export async function deleteStatus(idStatus: number): Promise<void> {
    const response = await fetch(`http://localhost:3000/statuses/${idStatus}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao excluir o status.");
    }
}
