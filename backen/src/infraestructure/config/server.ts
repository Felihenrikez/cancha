import express from "express";
import cors from "cors";
import router from "./routes";
import { connectDB } from "./database";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const PORT = 3000;
const MONGO_URI = "tu_url_de_mongodb";

async function startServer() {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
        console.log(`🚀 Servidor en http://localhost:${PORT}/api`);
    });
}

startServer();