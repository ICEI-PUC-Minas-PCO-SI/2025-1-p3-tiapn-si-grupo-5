import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error-handler";

export class MiddlewareConfig {
    public static register(app: Express) {
        app.use(express.json());
        app.use(cors({
            origin: process.env.FRONTEND_URL,
            credentials: true
        }));
        app.use(cookieParser());
        app.use(errorHandler);
    }
}
