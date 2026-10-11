# Despliegue — TP2 Grupo 10

## 1. Objetivo

Documentar el despliegue del frontend y del backend del sistema de gestión de clientes, así como las variables de entorno necesarias para su comunicación.

## 2. Arquitectura desplegada

El proyecto está compuesto por tres componentes principales:

- Frontend: interfaz desarrollada con React y Vite.
- Backend: API REST desarrollada con Node.js y Express.
- Base de datos: MongoDB Atlas.

## 3. Frontend — Vercel

**Plataforma:** Vercel.

**URL pública:**

https://tp-2-grupo10-proyecto-ly-ep-2026-ba.vercel.app/

El frontend se encuentra en la carpeta client/ y utiliza React, Vite y Axios.

La compilación de producción se realiza con:

npm run build

El directorio generado por Vite es dist/.

La variable de entorno VITE_API_URL debe apuntar a la URL pública del backend seguida del prefijo /api.

La configuración de client/vercel.json permite que las rutas de una aplicación de página única se dirijan a index.html, para que el enrutamiento del frontend pueda resolver las rutas internas.

## 4. Backend — Render

**Plataforma:** Render.

**URL pública del backend:**

https://tp2grupo10-proyectolyep2026-backend.onrender.com

**Endpoint de comprobación:**

https://tp2grupo10-proyectolyep2026-backend.onrender.com/api/health

La API se ejecuta con Node.js y Express. El comando de inicio definido en el proyecto es:

npm start

El backend carga las variables de entorno, establece la conexión con MongoDB Atlas y luego inicia el servidor HTTP.

## 5. Base de datos — MongoDB Atlas

**Servicio:** MongoDB Atlas.

La base de datos se encuentra alojada en la nube. El backend se conecta utilizando la variable MONGODB_URI, configurada en el entorno de Render.

Las credenciales de acceso no se incluyen en esta documentación.

## 6. Variables de entorno

| Variable       | Dónde se configura | Función                                      |
| -------------- | ------------------ | -------------------------------------------- |
| `VITE_API_URL` | Vercel             | URL base de la API utilizada por el frontend |
| `PORT`         | Render             | Puerto del backend                           |
| `MONGODB_URI`  | Render             | Conexión a MongoDB Atlas                     |
| `CORS_ORIGIN`  | Render             | URL pública del frontend autorizado          |

Para producción, VITE_API_URL debe utilizar la URL del backend terminada en /api, mientras que CORS_ORIGIN debe contener el origen público de Vercel, sin agregar /api.

## 7. Pruebas de despliegue

Se comprobó que el endpoint /api/health devuelve una respuesta JSON con el indicador ok en verdadero.

También se documentaron en pruebas-integracion.md las pruebas de consulta, creación, persistencia y eliminación de clientes.

El acceso directo a las rutas internas del frontend debe comprobarse después del despliegue de la configuración de Vercel.

## 8. Recomendaciones de mantenimiento

- Mantener actualizadas las variables de entorno de producción.
- No incluir credenciales en el repositorio.
- Revisar los registros de Render ante errores del backend o de conexión a MongoDB.
- Revisar el resultado de las compilaciones y despliegues de Vercel ante errores del frontend.
- Registrar las modificaciones mediante commits descriptivos y Pull Requests.

## 9. Conclusión

El despliegue separa el frontend, el backend y el almacenamiento de datos en servicios independientes. Esta arquitectura permite que la interfaz publicada en Vercel se comunique con la API desplegada en Render, que a su vez accede a MongoDB Atlas.
