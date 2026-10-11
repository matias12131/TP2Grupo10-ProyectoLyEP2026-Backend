const manejarRutaNoEncontrada = (req, res, next) => {
    const error = new Error(
        `Ruta no encontrada: ${req.method} ${req.originalUrl}`
    );
    error.statusCode = 404;
    next(error);
};

const manejarError = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    let statusCode = error.statusCode || 500;
    let mensaje = error.message;

    if (error.name === "ValidationError") {
        statusCode = 400;
        mensaje = Object.values(error.errors)
            .map((detalle) => detalle.message)
            .join("; ");
    } else if (error.code === 11000) {
        statusCode = 409;
        mensaje = "Ya existe un cliente con esos datos";
    } else if (error.name === "CastError") {
        statusCode = 400;
        mensaje = "ID inválido";
    } else if (error.type === "entity.parse.failed") {
        statusCode = 400;
        mensaje = "JSON inválido";
    } else if (statusCode >= 500) {
        mensaje = "Error interno del servidor";
    }

    if (statusCode >= 500) {
        console.error(error);
    }

    res.status(statusCode).json({ error: mensaje });
};

module.exports = { manejarRutaNoEncontrada, manejarError };
