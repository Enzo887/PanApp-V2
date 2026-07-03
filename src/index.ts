import express, { type Request, type Response } from 'express';
import {cuentaRouter} from './routes/cuentaRouter.js'
import { productoRouter } from './routes/productosRouter.js';
const app = express();
const PORT = process.env.PORT ?? 3000;

app.disable('x-powered-by');

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Servidor funcionando 🚀' });
});

app.use('/cuenta', cuentaRouter);
app.use('/producto', productoRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});