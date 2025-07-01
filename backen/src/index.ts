import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan'
import dotenv from 'dotenv';

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
//este es para seguridad
app.use(helmet());
// para registro
app.use(morgan('dev'));

app.get('/',(req,res) => {
  res.json({postMessage: 'backen funcionando! '});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
});