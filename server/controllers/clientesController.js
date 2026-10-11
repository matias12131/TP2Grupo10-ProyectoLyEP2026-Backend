const clientesService = require("../services/clientesService");

const obtenerClientes = async (req, res, next) => {
    try {
        const clientes = await clientesService.obtenerClientes();
        res.json(clientes);
    } catch (error) {
        next(error);
    }
};

const obtenerCliente = async (req, res, next) => {
    try {
        const cliente = await clientesService.obtenerCliente(req.params.id);
        res.json(cliente);
    } catch (error) {
        next(error);
    }
};

const crearCliente = async (req, res, next) => {
    try {
        const cliente = await clientesService.crearCliente(req.body);
        res.status(201).json(cliente);
    } catch (error) {
        next(error);
    }
};

const eliminarCliente = async (req, res, next) => {
    try {
        await clientesService.eliminarCliente(req.params.id);
        res.json({ mensaje: "Cliente eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerClientes,
    obtenerCliente,
    crearCliente,
    eliminarCliente,
};
