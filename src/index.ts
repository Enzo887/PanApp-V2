import express, { type Request, type Response } from 'express';
import {jornadaRouter} from './routes/jornadaRouter.js'
import { productoRouter } from './routes/productosRouter.js';
import "dotenv/config";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.disable('x-powered-by');

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Servidor funcionando 🚀' });
});

app.use('/jornada', jornadaRouter);
app.use('/productos', productoRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});