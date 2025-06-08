import { Request, Response } from "express";
import { DashboardService } from "../services/dashboardService";

const dashboardService = new DashboardService();

export class DashboardController {
    async getTicketsByType(req: Request, res: Response) {
        try {
            const { idTipoChamado } = req.query;
            const tickets = await dashboardService.getTicketsByType(Number(idTipoChamado));
            res.json(tickets);
        } catch (error) {
            console.log("Erro ao buscar chamados por tipo:", error)
            res.status(500).json({ error: "Erro ao buscar chamados por tipo de demanda" });
        }
    }

    async getTicketsByStatus(req: Request, res: Response) {
        try {
            const { idStatus } = req.query;
            const tickets = await dashboardService.getTicketsByStatus(Number(idStatus));
            res.json(tickets);
        } catch (error) {
            console.log("Erro ao buscar chamados por status:", error)
            res.status(500).json({ error: "Erro ao buscar chamados por status" });
        }
    }

    async getTicketsByPriority(req: Request, res: Response) {
        try {
            const { idPrioridade } = req.query;
            const tickets = await dashboardService.getTicketsByPriority(Number(idPrioridade));
            res.json(tickets);
        } catch (error) {
            console.log("Erro ao buscar chamados por prioridade:", error)
            res.status(500).json({ error: "Erro ao buscar chamados por prioridade" });
        }
    }

    async getTicketsByAnalyst(req: Request, res: Response) {
        try {
            const { idAnalista } = req.query;
            const tickets = await dashboardService.getTicketsByAnalyst(Number(idAnalista));
            res.json(tickets);
        } catch (error) {
            console.log("Erro ao buscar chamados por analista:", error)
            res.status(500).json({ error: "Erro ao buscar chamados por analista" });
        }
    }
}
