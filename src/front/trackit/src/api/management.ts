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
