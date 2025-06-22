import { ServerBootstrap } from "./ServerBootstrap";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT ?? 3000;

const serverBootstrap = new ServerBootstrap(PORT);
serverBootstrap.start();
