import express, { Express } from "express";
import { RouteConfig } from "./RouteConfig";
import { MiddlewareConfig } from "./MiddlewareConfig";

export class App {
    private app: Express;

    constructor() {
        this.app = express();
        MiddlewareConfig.register(this.app);
        RouteConfig.register(this.app);
    }

    public getInstance(): Express {
        return this.app;
    }
}