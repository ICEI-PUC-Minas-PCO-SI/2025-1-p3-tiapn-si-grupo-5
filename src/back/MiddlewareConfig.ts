import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error-handler";

export class MiddlewareConfig {
    public static register(app: Express) {
        app.use(express.json());
        app.use(cors({
            origin: "https://trackit-front.onrender.com",
            credentials: true,
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"]
        }));
        app.use(cookieParser());
        app.use(errorHandler);
    }
}
