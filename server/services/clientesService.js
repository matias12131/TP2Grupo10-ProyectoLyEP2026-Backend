const mongoose = require("mongoose");
const Cliente = require("../models/Cliente");

const crearError = (mensaje, statusCode) => {
    const error = new Error(mensaje);
    error.statusCode = statusCode;
    return error;
};

const validarId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw crearError("ID inválido", 400);
    }
};

const obtenerClientes = () => Cliente.find();

const obtenerCliente = async (id) => {
    validarId(id);
    const cliente = await Cliente.findById(id);
    if (!cliente) {
        throw crearError("Cliente no encontrado", 404);
    }
    return cliente;
};

const crearCliente = async (datos) => {
    if (!datos || typeof datos !== "object" || Array.isArray(datos)) {
        throw crearError("El cuerpo de la solicitud debe ser un objeto", 400);
    }
    return Cliente.create(datos);
};

const eliminarCliente = async (id) => {
    validarId(id);
    const cliente = await Cliente.findByIdAndDelete(id);
    if (!cliente) {
        throw crearError("Cliente no encontrado", 404);
    }
};

module.exports = {
    obtenerClientes,
    obtenerCliente,
    crearCliente,
    eliminarCliente,
};
