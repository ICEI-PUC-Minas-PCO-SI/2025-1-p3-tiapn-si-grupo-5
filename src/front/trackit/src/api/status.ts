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
