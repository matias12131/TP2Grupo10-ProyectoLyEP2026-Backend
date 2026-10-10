# TP2 – Legislación y Ejercicio Profesional 2026 – Grupo 10.
Sistema de gestión de clientes: frontend React (Vite) y backend Node.js + Express.

## Estructura

```
├── client/   Frontend React + Vite (puerto 5173)
└── server/   Backend Node.js + Express (puerto 3001)
    └── controllers
    └── documents
    └── middleware
    └── models
    └── routes
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
| `server/` | `MONGODB_URI` | Cadena de conexión a la base de datos |
| `server/` | `CORS_ORIGIN` | Origen del frontend permitido (http://localhost:5173) |

## Estado del proyecto

Esta es la estructura base. La conexión a la base de datos, los endpoints y la integración con el frontend se van incorporando por etapas y se documentan a medida que se suman.

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