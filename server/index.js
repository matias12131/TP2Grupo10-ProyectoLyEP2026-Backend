require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");
const {
    manejarRutaNoEncontrada,
    manejarError,
} = require("./middleware/errorHandler");

const app = express();

// Middlewares
//app.use(cors({ origin: "http://localhost:5173" }));
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    })
);
app.use(express.json());

// Rutas
app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/users", require("./routes/users"));
app.use(manejarRutaNoEncontrada);
app.use(manejarError);

// Arranque: primero conecta a la base, después levanta el servidor
const iniciar = async () => {
    await conectarDB();
    app.listen(process.env.PORT, () =>
        console.log(`Servidor en http://localhost:${process.env.PORT}`)
    );
};

iniciar();
