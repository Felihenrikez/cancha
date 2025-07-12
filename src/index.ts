import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan'
import dotenv from 'dotenv';
import { connectDatabase } from './config/mongooserConfig';
import userRoutes from './infrastructure/web/routes/userRoutes';

dotenv.config();

const app = express();

// Conectar a la base de datos
connectDatabase();

//middlewares
app.use(express.json());
app.use(cors());
//este es para seguridad
app.use(helmet());
// para registro
app.use(morgan('dev'));

// Rutas
app.use('/api/users', userRoutes);

app.get('/',(req,res) => {
  res.json({postMessage: 'backen funcionando! '});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
});