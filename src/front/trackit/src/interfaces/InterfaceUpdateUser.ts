export interface UpdateUser {
    idUsuario: number;
    nomeUsuario: string;
    email: string;
    ramal: string;
    matricula?: string;
    gerencia?: number;
    tipoUsuario?: number;
}
