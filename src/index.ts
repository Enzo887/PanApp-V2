import express, { type Request, type Response } from 'express';
import {cuentaRouter} from './routes/cuentaRouter.js'
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Servidor funcionando 🚀' });
});

app.use('/cuenta', cuentaRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});