export interface Chamado {
    idChamado: number;
    protocolo: string;
    assunto: string;
    descricao: string;
    dataAbertura: string;
    dataAtualizacao?: string | null;
    dataFechamento?: string | null;
    idSolicitante: number 
    idAnalista?: number | null;
    idTipoChamado?: number | null; // Alterar depois para Obrigatório
    idStatus?: number | null; // Alterar depois para Obrigatório
    idPrioridade?: number | null; // Alterar depois para Obrigatório
}

export interface NovoChamado {
    assunto: string;
    descricao: string;
    idSolicitante: number;
    idPrioridade?: number | null;
    idTipoChamado?: number | null;
}