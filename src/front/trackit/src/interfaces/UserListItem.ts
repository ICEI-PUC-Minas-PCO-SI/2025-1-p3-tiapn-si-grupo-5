export interface UserListItem {
    id: string;
    name: string;
    matricula: string;
    accessType: "Gestor" | "Analista" | "Usuário";
    management: {
        idGerencia: number;
        nomeGerencia: string;
    };
    ativo: number;
}