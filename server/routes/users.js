const express = require("express");
const mongoose = require("mongoose");
const Cliente = require("../models/Cliente");

const router = express.Router();

// GET /api/users -> lista de clientes
router.get("/", async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener clientes" });
    }
});

// GET /api/users/:id -> un cliente
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el cliente" });
    }
});

module.exports = router;
