import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes';
import chamadoRoutes from './routes/chamadoRoutes';

const app = express();
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/chamado', chamadoRoutes);

export default app;
