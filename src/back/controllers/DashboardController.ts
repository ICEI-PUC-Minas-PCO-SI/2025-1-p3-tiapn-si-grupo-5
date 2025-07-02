import { Request, Response } from "express";
import { DashboardService } from "../services/DashboardService";

const dashboardService = new DashboardService();

export class DashboardController {
    /*
    -- NÃO MAIS UTILIZADO, MAS MANTIDO PARA REFERÊNCIA --
    
    async getTicketsByType(req: Request, res: Response) {
            try {
                const { idTipoChamado, idAnalista } = req.query;
                const tickets = await dashboardService.getTicketsByType(
                    Number(idTipoChamado),
                    idAnalista ? Number(idAnalista) : undefined
                );
                res.json(tickets);
            } catch (error) {
                console.log("Erro ao buscar chamados por tipo:", error)
                res.status(500).json({ error: "Erro ao buscar chamados por tipo de demanda" });
            }
        }
    
        async getTicketsByStatus(req: Request, res: Response) {
            try {
                const { idStatus, idAnalista } = req.query;
                const tickets = await dashboardService.getTicketsByStatus(
                    Number(idStatus),
                    idAnalista ? Number(idAnalista) : undefined
                );
                res.json(tickets);
            } catch (error) {
                console.log("Erro ao buscar chamados por status:", error)
                res.status(500).json({ error: "Erro ao buscar chamados por status" });
            }
        }
    
        async getTicketsByPriority(req: Request, res: Response) {
            try {
                const { idPrioridade, idAnalista } = req.query;
                const tickets = await dashboardService.getTicketsByPriority(
                    Number(idPrioridade),
                    idAnalista ? Number(idAnalista) : undefined
                );
                res.json(tickets);
            } catch (error) {
                console.log("Erro ao buscar chamados por prioridade:", error)
                res.status(500).json({ error: "Erro ao buscar chamados por prioridade" });
            }
        }
    
     */

    async getTicketsByAnalyst(req: Request, res: Response) {
        try {
            const { idAnalista } = req.query;
            const summary = await dashboardService.getAnalystDashboardSummary(Number(idAnalista));
            res.json(summary);
        } catch {
            res.status(500).json({ error: "Erro ao buscar chamados por analista" });
        }
    }

    async getDashboardSummary(req: Request, res: Response) {
        try {
            const summary = await dashboardService.getDashboardSummary();
            res.json(summary);
        } catch {
            res.status(500).json({ error: "Erro ao buscar resumo do dashboard" });
        }
    }
}
