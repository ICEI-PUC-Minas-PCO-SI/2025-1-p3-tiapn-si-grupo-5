export interface IManagement {
    idGerencia: number;
    nomeGerencia: string;
    ativo: number;
}

export async function getAllActiveManagements(): Promise<IManagement[]> {
    try {
        const response = await fetch("http://localhost:3000/departments");
        if (!response.ok) {
            throw new Error("Erro ao buscar gerências ativas");
        }
        const managements = await response.json();
        return managements;
    } catch (error) {
        console.error("Erro ao buscar gerências ativas:", error);
        throw error;
    }
}

export async function addManagement(nomeGerencia: string): Promise<IManagement> {
    const response = await fetch("http://localhost:3000/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomeGerencia }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao adicionar gerência.");
    }
    return response.json();
}

export async function updateManagement(idGerencia: number, nomeGerencia: string): Promise<IManagement> {
    const response = await fetch(`http://localhost:3000/departments/${idGerencia}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomeGerencia }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar gerência.");
    }
    return response.json();
}

export async function deleteManagement(idGerencia: number): Promise<void> {
    const response = await fetch(`http://localhost:3000/departments/${idGerencia}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao excluir a gerência.");
    }
}
