# Base de datos — TP2 Grupo 10

## 1. Objetivo

El proyecto utiliza MongoDB Atlas como sistema de almacenamiento de datos. La base de datos permite conservar los registros de clientes y consultarlos desde el backend.

## 2. Tecnologías utilizadas

- MongoDB Atlas: servicio de base de datos en la nube.
- Mongoose: biblioteca de Node.js para conectarse a MongoDB y trabajar con modelos de datos.
- Node.js y Express: gestionan las solicitudes de la API.

## 3. Configuración de la conexión

La conexión se implementa en:

server/config/db.js

El archivo importa Mongoose y define la función conectarDB(), que utiliza la variable de entorno MONGODB_URI para establecer la conexión.

La conexión se realiza mediante:

`mongoose.connect(process.env.MONGODB_URI)`

Si la conexión tiene éxito, se muestra en los registros del servidor un mensaje que identifica el host de MongoDB.

Si ocurre un error, se registra el mensaje correspondiente y el proceso finaliza con error.

## 4. Inicialización del backend

El archivo server/index.js carga las variables de entorno y ejecuta conectarDB() antes de iniciar el servidor HTTP.

De esta manera, el backend intenta conectarse a la base de datos antes de comenzar a aceptar solicitudes.

## 5. Modelo de datos

El modelo Cliente se encuentra en:

`server/models/Cliente.js`

El modelo representa los clientes gestionados por el sistema. Según la estructura documentada del proyecto, contiene los siguientes campos:

| Campo             | Tipo   | Descripción                |
| ----------------- | ------ | -------------------------- |
| `email`           | String | Correo electrónico         |
| `username`        | String | Nombre de usuario          |
| `password`        | String | Contraseña, si corresponde |
| `name.firstname`  | String | Nombre                     |
| `name.lastname`   | String | Apellido                   |
| `address.street`  | String | Calle                      |
| `address.number`  | Number | Número de domicilio        |
| `address.zipcode` | String | Código postal              |
| `address.city`    | String | Ciudad                     |
| `phone`           | String | Teléfono                   |

Los campos obligatorios y opcionales se determinan en la definición actual del modelo.

## 6. Variables de entorno

El backend utiliza las siguientes variables:

| Variable      | Función                                                  |
| ------------- | -------------------------------------------------------- |
| `MONGODB_URI` | Cadena de conexión a MongoDB Atlas                       |
| `PORT`        | Puerto de escucha del servidor                           |
| `CORS_ORIGIN` | Origen del frontend autorizado para realizar solicitudes |

Las variables reales deben configurarse localmente o en el panel de Render. No se deben publicar contraseñas ni cadenas de conexión con credenciales en el repositorio.

El archivo server/.env.example debe contener valores de ejemplo, sin secretos reales.

## 7. Verificación de la persistencia

La persistencia significa que los datos guardados permanecen almacenados y pueden recuperarse mediante nuevas consultas.

Según las pruebas registradas en pruebas-integracion.md, se realizaron las siguientes verificaciones:

1. Consultar la lista de clientes almacenados.
2. Crear un cliente de prueba.
3. Volver a consultar la lista y comprobar que el cliente continúa disponible después de recargar la página.
4. Eliminar el cliente de prueba.
5. Consultar nuevamente la lista para comprobar que ya no aparece.

Estas pruebas permiten verificar las operaciones de lectura, creación y eliminación mediante el sistema integrado.

## 8. Consideraciones de seguridad

- Mantener MONGODB_URI fuera del código público.
- No subir archivos .env reales a GitHub.
- Configurar los permisos de acceso a la base de datos en MongoDB Atlas.
- Utilizar únicamente las credenciales necesarias para el funcionamiento del backend.

## 9. Resultado

La integración permite que el backend se comunique con MongoDB Atlas y gestione los registros de clientes mediante la API REST del proyecto.
