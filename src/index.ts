import express, { type Request, type Response } from 'express';
import {jornadaRouter} from './routes/jornadaRouter.js'
import { productoRouter } from './routes/productosRouter.js';
import "dotenv/config";
import cors from 'cors'

const app = express();
const PORT = process.env.PORT ?? 3000;

app.disable('x-powered-by');
app.use(cors({
  origin: 'http://localhost:5173', // el origen de tu frontend
  credentials: true, // si usás cookies o auth headers
}));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Servidor funcionando 🚀' });
});

app.use('/jornada', jornadaRouter);
app.use('/productos', productoRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});