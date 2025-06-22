import { ServerBootstrap } from "./ServerBootstrap";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT ?? 3000;
console.log("FRONTEND_URL em uso:", process.env.FRONTEND_URL);

const serverBootstrap = new ServerBootstrap(PORT);
serverBootstrap.start();
