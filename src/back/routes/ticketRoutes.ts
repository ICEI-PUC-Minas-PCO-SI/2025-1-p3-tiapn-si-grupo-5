import { Router } from "express";
import { TicketController } from "../controllers/TicketController";
import { autenticarToken } from "../middlewares/auth-jwt";
import { validatePayload } from "../middlewares/validate-payload";
import { z } from "zod";
import { upload } from "../middlewares/multer";

/* const ticketCreateSchema = z.object({
    assunto: z.string().min(3),
    descricao: z.string().min(3),
    idSolicitante: z.number(),
    idPrioridade: z.number(),
    idTipoChamado: z.number(),
    nomeArquivo: z.string().optional()
}); */

const ticketUpdateAnalystSchema = z.object({
    idAnalista: z.union([z.number(), z.string()])
});
const ticketUpdateStatusSchema = z.object({
    idStatus: z.union([z.number(), z.string()])
});
const ticketCloseSchema = z.object({
    dataFechamento: z.string()
});

export class TicketRoutes {
    private router: Router;
    private ticketController: TicketController;

    constructor() {
        this.router = Router();
        this.ticketController = new TicketController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            "/",
            upload.single("file"),
            autenticarToken,
            (req, res, next) => {
                this.ticketController.createTicket(req, res)
                    .then(() => undefined)
                    .catch(next);
            }
        );
        this.router.get("/", autenticarToken, this.ticketController.getAllTickets.bind(this.ticketController));
        this.router.get("/unassigned", autenticarToken, this.ticketController.getUnassignedTickets.bind(this.ticketController));
        this.router.get("/my", autenticarToken, this.ticketController.getMyTickets.bind(this.ticketController));
        this.router.patch("/:idChamado/assign", autenticarToken, this.ticketController.assignTicket.bind(this.ticketController));
        this.router.patch(
            "/:idChamado/analyst",
            autenticarToken,
            validatePayload(ticketUpdateAnalystSchema),
            (req, res, next) => {
                this.ticketController.updateTicketAnalyst(req, res)
                    .then(() => undefined)
                    .catch(next);
            }
        );
        this.router.get(
            "/team",
            autenticarToken,
            (req, res, next) => {
                this.ticketController.getTeamTickets(req, res)
                    .then(() => undefined)
                    .catch(next);
            }
        );
        this.router.get(
            "/analyst/:idAnalista",
            autenticarToken,
            (req, res, next) => {
                this.ticketController.getTicketsByAnalystId(req, res)
                    .then(() => undefined)
                    .catch(next);
            }
        );
        this.router.get(
            "/user/:idSolicitante",
            autenticarToken,
            (req, res, next) => {
                this.ticketController.getTicketsBySolicitanteId(req, res)
                    .then(() => undefined)
                    .catch(next);
            }
        );
        this.router.get(
            "/:idChamado",
            autenticarToken,
            (req, res, next) => {
                this.ticketController.getTicketById(req, res)
                    .then(() => undefined)
                    .catch(next);
            }
        );
        this.router.patch(
            "/:idChamado/status",
            autenticarToken,
            validatePayload(ticketUpdateStatusSchema),
            (req, res, next) => {
                this.ticketController.updateTicketStatus(req, res)
                    .then(() => undefined)
                    .catch(next);
            }
        );
        this.router.patch(
            "/:idChamado/close",
            autenticarToken,
            validatePayload(ticketCloseSchema),
            (req, res, next) => {
                this.ticketController.closeTicket(req, res)
                    .then(() => undefined)
                    .catch(next);
            }
        );
        this.router.patch(
            "/:idChamado/reopen",
            autenticarToken,
            (req, res, next) => {
                this.ticketController.reopenTicket(req, res)
                    .then(() => undefined)
                    .catch(next);
            }
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}