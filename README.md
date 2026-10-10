# TP2 – Legislación y Ejercicio Profesional 2026 – Grupo 10.
Sistema de gestión de clientes: frontend React (Vite) y backend Node.js + Express.

## Estructura

```
├── client/   Frontend React + Vite (puerto 5173)
└── server/   Backend Node.js + Express (puerto 3001)
    └── config        Conexión a MongoDB Atlas (db.js)
    └── controllers
    └── documents
    └── middleware
    └── models        Modelo Cliente
    └── routes        Rutas de /api/users
```

## Cómo levantar el proyecto

Requisito: tener Node.js y npm instalados.

### Frontend (`client/`)

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Abre en http://localhost:5173.

### Backend (`server/`)

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Responde en http://localhost:3001.

> Los archivos `.env` no se suben al repositorio: cada integrante crea el suyo a partir de `.env.example`. El valor de `MONGODB_URI` se comparte por privado entre el equipo.
> En CMD de Windows, `cp` se reemplaza por `copy`.

## Variables de entorno

| Carpeta | Variable | Descripción |
|---|---|---|
| `client/` | `VITE_API_URL` | URL del backend. Por ahora apunta a FakeStoreAPI |
| `server/` | `PORT` | Puerto del servidor (3001) |
| `server/` | `MONGODB_URI` | Cadena de conexión a MongoDB Atlas |
| `server/` | `CORS_ORIGIN` | Origen del frontend permitido (http://localhost:5173) |

## Base de datos y API de clientes

### Conexión a MongoDB Atlas

La conexión se define en `server/config/db.js` con `mongoose` y lee la cadena desde `MONGODB_URI`. `index.js` la invoca con `await conectarDB()` antes de levantar el servidor, así no se reciben peticiones sin base de datos. Si la conexión falla, el proceso termina con error.

Al iniciar correctamente se ve en consola:

```
MongoDB conectado: <host del cluster>
```

### Modelo `Cliente`

Definido en `server/models/Cliente.js`, con la misma estructura que consume el frontend:

| Campo | Tipo | Requerido |
|---|---|---|
| `email` | String | Sí |
| `username` | String | Sí |
| `password` | String | No |
| `name.firstname` | String | Sí |
| `name.lastname` | String | Sí |
| `address.street` | String | No |
| `address.number` | Number | No |
| `address.zipcode` | String | No |
| `address.city` | String | No |
| `phone` | String | No |

El modelo transforma `_id` en `id` y oculta `__v` en las respuestas JSON, para que el frontend (que usa `cliente.id`) no se rompa.

### Endpoints disponibles

| Método | Ruta | Descripción | Respuestas |
|---|---|---|---|
| GET | `/api/health` | Verifica que el servidor responde | 200 |
| GET | `/api/users` | Lista de clientes | 200, 500 |
| GET | `/api/users/:id` | Detalle de un cliente | 200, 400 (ID inválido), 404 (no existe), 500 |

Ejemplo de respuesta de `GET /api/users/:id`:

```json
{
  "id": "665f1c2e8b3a4d0012a1b2c3",
  "email": "laura.gomez@example.com",
  "username": "lauragomez",
  "name": { "firstname": "Laura", "lastname": "Gómez" },
  "address": { "street": "Av. Belgrano", "number": 1250, "zipcode": "4600", "city": "San Salvador de Jujuy" },
  "phone": "388-4551234"
}
```

### Problemas frecuentes

- **`Cannot find module 'mongoose'`**: faltan dependencias. Ejecutar `npm install` en `server/`.
- **`querySrv ECONNREFUSED`**: la red o el DNS bloquea la resolución SRV de Atlas. Probar con otro DNS (`8.8.8.8`, `1.1.1.1`) o con otra red.
- **Error de autenticación**: revisar usuario y contraseña en `MONGODB_URI` (los caracteres especiales deben ir codificados, por ejemplo `@` como `%40`) y que la IP esté habilitada en Network Access de Atlas.

## Estado del proyecto

Implementado: estructura base, conexión a MongoDB Atlas, modelo `Cliente` y endpoints de lectura (`GET /api/users` y `GET /api/users/:id`).

Pendiente: `POST` y `DELETE`, manejo de errores completo y seed de datos, integración con el frontend (hoy `VITE_API_URL` sigue apuntando a FakeStoreAPI), testing y deploy. Se documentan a medida que se suman.

## Origen del código

El frontend proviene del TP1, que analizó y mejoró el proyecto de gutso:
- Repositorio del TP1: https://github.com/matias12131/ProyectoLyEP2026
- Proyecto original: https://github.com/gustso/ProyectoLyEP2026

## Integrantes

· Apaza Ignacio 
· Real Enrique 
· Ramos Alex 
· Huanca Ignacio 
· Velázquez Matías