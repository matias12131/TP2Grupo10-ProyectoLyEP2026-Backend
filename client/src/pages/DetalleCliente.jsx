import '../css/detallecliente.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clientesService from "../services/clientesService";
 
const DetalleCliente = () => {
 const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

const [cliente, setCliente] = useState(null);
const [mensaje, setMensaje] = useState("");
const [error, setError] = useState("");
const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarCliente = async () => {
        setCargando(true);
        setError("");
        setCliente(null);

        try {
            const data = await clientesService.obtenerCliente(id);
            setCliente(data);
        } catch (err) {
            if (err.response?.status === 404) {
                setError("El cliente solicitado no existe.");
            } else if (err.response?.status === 400) {
                setError("El identificador del cliente no es válido.");
            } else {
                setError(
                    "No se pudo cargar el cliente. Intente nuevamente."
                );
            }
        } finally {
            setCargando(false);
        }
    };

    cargarCliente();
}, [id]);

const eliminarCliente = async () => {
    try {
  const respuesta = await clientesService.eliminarCliente(id);

      if (respuesta.status === 200) {
        setMensaje("Cliente eliminado correctamente");

        setTimeout(() => {
          navigate("/clientes");
          }, 2000);
}
    } catch (error) {
      setMensaje("Error al eliminar cliente");
    }
  };
  if (cargando) {
    return <h2>Cargando cliente...</h2>;
}

if (error && !cliente) {
    return (
        <div className="detalle-cliente">
            <p role="alert">{error}</p>
            <button onClick={() => navigate("/clientes")}>
                Volver a clientes
            </button>
        </div>
    );
}

if (!cliente) {
    return <p role="alert">No se encontró el cliente.</p>;
}

  return (
    <div className="detalle-cliente">
      <h1>Ficha del Cliente</h1>
      <p>Rol actual: {role}</p>

      {mensaje && <p className = 'mensaje-eliminado'>{mensaje}</p>}

      <p>
        <strong>ID:</strong> {cliente.id}
      </p>

      <p>
        <strong>Nombre:</strong>{" "}
        {cliente.name.firstname} {cliente.name.lastname}
      </p>

      <p>
        <strong>Nombre de Usuario:</strong> {cliente.username}
      </p>

      <p>
        <strong>Email:</strong> {cliente.email}
      </p>

      <p>
        <strong>Teléfono:</strong> {cliente.phone}
      </p>

      <h2>Dirección</h2>

      <p>
        <strong>Calle:</strong> {cliente.address.street}
      </p>

      <p>
        <strong>Número:</strong> {cliente.address.number}
      </p>

      <p>
        <strong>Código Postal:</strong> {cliente.address.zipcode}
      </p>

      <p>
        <strong>Ciudad:</strong> {cliente.address.city}
      </p>

      {role?.trim() === "Gerencia" && (
        <button className='btn-eliminar'onClick={eliminarCliente}>
          Eliminar Cliente
        </button>
      )}
    </div>
  );
};

export default DetalleCliente;