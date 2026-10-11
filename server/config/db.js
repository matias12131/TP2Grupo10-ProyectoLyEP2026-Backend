const dns = require("dns");
const mongoose = require("mongoose");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const conectarDB = async () => {
    try {
        const conexion = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB conectado: ${conexion.connection.host}`);
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = conectarDB;
