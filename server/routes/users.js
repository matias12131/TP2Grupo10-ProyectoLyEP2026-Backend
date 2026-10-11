const express = require("express");
const clientesController = require("../controllers/clientesController");

const router = express.Router();

router.get("/", clientesController.obtenerClientes);
router.get("/:id", clientesController.obtenerCliente);
router.post("/", clientesController.crearCliente);
router.delete("/:id", clientesController.eliminarCliente);

module.exports = router;
