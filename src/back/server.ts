import { ServerBootstrap } from "./ServerBootstrap";

const PORT = process.env.PORT || 3000;

const serverBootstrap = new ServerBootstrap(PORT);
serverBootstrap.start();
