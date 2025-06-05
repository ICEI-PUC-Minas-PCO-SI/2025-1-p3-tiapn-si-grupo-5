import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
    status?: number;
    details?: unknown;
}

export function errorHandler(
    err: AppError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) {
    const status = err.status ?? 500;
    const message = err.message ?? "Internal Server Error";
    res.status(status).json({
        error: message,
        details: err.details ?? undefined
    });
}
