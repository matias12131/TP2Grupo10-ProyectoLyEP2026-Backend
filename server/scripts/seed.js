require("dotenv").config();
const mongoose = require("mongoose");
const conectarDB = require("../config/db");
const Cliente = require("../models/Cliente");

const clientesIniciales = [
    {
        email: "ana.garcia@example.com",
        username: "anagarcia",
        password: "",
        name: { firstname: "Ana", lastname: "Garcia" },
        address: {
            street: "San Martin",
            number: 120,
            zipcode: "1000",
            city: "Buenos Aires",
        },
        phone: "11-4000-1000",
    },
    {
        email: "bruno.lopez@example.com",
        username: "brunolopez",
        password: "",
        name: { firstname: "Bruno", lastname: "Lopez" },
        address: {
            street: "Cordoba",
            number: 245,
            zipcode: "5000",
            city: "Cordoba",
        },
        phone: "351-400-2000",
    },
    {
        email: "carla.perez@example.com",
        username: "carlaperez",
        password: "",
        name: { firstname: "Carla", lastname: "Perez" },
        address: {
            street: "Mitre",
            number: 86,
            zipcode: "5500",
            city: "Mendoza",
        },
        phone: "261-400-3000",
    },
];

const ejecutarSeed = async () => {
    try {
        await conectarDB();
        const operaciones = clientesIniciales.map((cliente) => ({
            updateOne: {
                filter: { email: cliente.email },
                update: { $setOnInsert: cliente },
                upsert: true,
            },
        }));
        const resultado = await Cliente.bulkWrite(operaciones);
        console.log(
            `Seed completado: ${resultado.upsertedCount} clientes nuevos; los existentes se conservaron.`
        );
    } catch (error) {
        console.error("Error al ejecutar el seed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

ejecutarSeed();
