import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan'
import dotenv from 'dotenv';
import { connectDatabase } from './config/mongooserConfig';
import userRoutes from './infrastructure/web/routes/userRoutes';
import clubRoutes from './infrastructure/web/routes/clubRoutes';
import fieldRoutes from './infrastructure/web/routes/fieldRoutes';
import scheduleRoutes from './infrastructure/web/routes/scheduleRoutes';
import reservationRoutes from './infrastructure/web/routes/reservationRoutes';
import alertRoutes from './infrastructure/web/routes/alertRoutes';
import authRoutes from './infrastructure/web/routes/authRoutes';

dotenv.config();

const app = express();

// Conectar a la base de datos
connectDatabase();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/fields', fieldRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/alerts', alertRoutes);

app.get('/',(req,res) => {
  res.json({postMessage: 'backen funcionando! '});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});