# API REST — TP2 Grupo 10

## 1. Objetivo

La API REST permite gestionar los clientes del sistema mediante solicitudes HTTP. El backend está desarrollado con Node.js y Express, y utiliza MongoDB Atlas para almacenar los datos.

## 2. Tecnologías utilizadas

- Node.js: entorno de ejecución.
- Express: creación del servidor y definición de rutas.
- Mongoose: comunicación con MongoDB.
- CORS: permite las solicitudes desde el frontend autorizado.
- Axios: realiza las solicitudes HTTP desde el frontend.

## 3. URL base

**Desarrollo local:**

http://localhost:3001/api

**Producción:**

https://tp2grupo10-proyectolyep2026-backend.onrender.com/api

## 4. Endpoints disponibles

| Método | Ruta             | Descripción                                                                 | Respuesta esperada                |
| ------ | ---------------- | --------------------------------------------------------------------------- | --------------------------------- |
| GET    | `/api/health`    | Comprueba que el servidor está activo.                                      | 200 OK                            |
| GET    | `/api/users`     | Obtiene la lista de clientes.                                               | 200 OK con un arreglo JSON        |
| GET    | `/api/users/:id` | Obtiene un cliente por su identificador.                                    | Cliente en JSON si existe         |
| POST   | `/api/users`     | Crea un cliente utilizando los datos enviados en el cuerpo de la solicitud. | 201 Created con el cliente creado |
| DELETE | `/api/users/:id` | Elimina un cliente mediante su identificador.                               | Mensaje de confirmación           |

## 5. Funcionamiento de los endpoints

### GET /api/health

Comprueba que el servidor responde correctamente.

Ejemplo de respuesta:

{"ok":true}

### GET /api/users

Devuelve la lista de clientes almacenados en MongoDB.

### GET /api/users/:id

Permite consultar un cliente específico utilizando su identificador.

Ejemplo de ruta:

GET /api/users/IDENTIFICADOR_DEL_CLIENTE

El comportamiento ante identificadores inválidos o clientes inexistentes depende de las validaciones y del manejo de errores del backend.

### POST /api/users

Permite registrar un nuevo cliente. Los datos se envían en formato JSON mediante el cuerpo de la solicitud.

Ejemplo ilustrativo de cuerpo:

```json
{
  "email": "cliente@example.com",
  "username": "cliente01",
  "name": {
    "firstname": "Laura",
    "lastname": "Gomez"
  }
}
```

El ejemplo muestra algunos de los campos del modelo; los campos obligatorios deben respetar las validaciones definidas en el proyecto.

Si la operación finaliza correctamente, el servidor devuelve el cliente creado con estado HTTP 201.

### DELETE /api/users/:id

Elimina el cliente identificado por el parámetro "id".

Cuando la operación finaliza correctamente, el servidor responde:

```json
{
  "mensaje": "Cliente eliminado correctamente"
}
```

## 6. Arquitectura de las rutas

El archivo server/index.js registra las rutas bajo el prefijo /api/users. El archivo de rutas delega las operaciones al controlador clientesController, que utiliza clientesService para ejecutar la lógica correspondiente.

El servidor también incorpora middleware para gestionar rutas inexistentes y errores.

## 7. Configuración del frontend

El archivo client/src/services/api.js configura Axios mediante la variable de entorno VITE_API_URL.

En producción, esta variable debe apuntar a:

https://tp2grupo10-proyectolyep2026-backend.onrender.com/api

## 8. Pruebas

Las pruebas de integración documentadas en pruebas-integracion.md incluyen la comprobación del estado del servidor, la consulta de clientes, la creación de registros, la persistencia y la eliminación.

Las respuestas HTTP y los casos de error deben verificarse contra el comportamiento real de la implementación.

## 9. Manejo de errores

Las funciones del controlador delegan los errores al middleware mediante next(error). El servidor también cuenta con un middleware para rutas no encontradas.

Los códigos de error específicos dependen de las validaciones del servicio y de la implementación del middleware.