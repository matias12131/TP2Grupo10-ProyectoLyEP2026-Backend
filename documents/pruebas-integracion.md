# Pruebas de integración – TP2 Grupo 10

## 1. Objetivo

Verificar la integración entre el frontend desarrollado con React y Vite, el backend implementado con Node.js y Express, y la base de datos MongoDB. Se comprueba el funcionamiento de las consultas, la visualización de clientes, la creación y la eliminación de registros.

## 2. Entorno de prueba

- **Frontend:** React y Vite.
- **Backend:** Node.js y Express.
- **Base de datos:** MongoDB Atlas.
- **API local:** `http://localhost:3001/api`.
- **Frontend local:** `http://localhost:5173/`.
- **Herramientas de verificación:** navegador web y PowerShell.

## 3. Casos de prueba ejecutados

| ID | Prueba | Resultado esperado | Resultado obtenido |
|---|---|---|---|
| PI-01 | Consultar `GET /api/health` | El servidor responde indicando que está activo. | Aprobado: `ok = true`. |
| PI-02 | Consultar `GET /api/users` | La API devuelve los clientes almacenados. | Aprobado: se recuperaron los tres clientes existentes. |
| PI-03 | Abrir la aplicación React | La interfaz carga correctamente. | Aprobado. |
| PI-04 | Consultar la lista de clientes desde el frontend | Se muestran los clientes devueltos por la API. | Aprobado. |
| PI-05 | Abrir el detalle de un cliente | Se visualizan sus datos correspondientes. | Aprobado. |
| PI-06 | Revisar errores de conexión en el navegador | No aparecen errores de conexión con la API. | Aprobado durante la comprobación realizada. |
| PI-07 | Crear un cliente de prueba | El backend guarda el registro y devuelve una respuesta satisfactoria. | Aprobado: la creación fue confirmada. |
| PI-08 | Verificar la persistencia del cliente creado | El registro continúa disponible al consultar nuevamente la lista. | Aprobado: apareció después de recargar la página. |
| PI-09 | Eliminar el cliente de prueba | El backend elimina el registro solicitado. | Aprobado: el cliente dejó de aparecer en la lista. |

## 4. Observaciones

- La API respondió correctamente y permitió recuperar los clientes almacenados en MongoDB.
- La creación y la eliminación de registros funcionaron desde la aplicación.
- Después de crear un cliente, la lista no se actualizó automáticamente. Fue necesario recargar la página para visualizar el nuevo registro.
- La comprobación de formato con Prettier no pasó: detectó problemas de formato en 12 archivos. Este resultado no demuestra por sí solo errores funcionales; queda pendiente decidir si se corrige el formato.
- No se ejecutó el script de carga inicial (`seed.js`) durante las pruebas de integración.

### 5. Pruebas automatizadas con Vitest

Se incorporó Vitest al frontend desarrollado con React y Vite, junto con React Testing Library y jsdom para probar componentes.

**Ejecución:** `npm run test -- --run`

**Resultado:** 8 pruebas aprobadas, distribuidas en 2 archivos de prueba.

**Casos verificados:**
- Visualización del indicador de carga del cliente.
- Visualización de los datos de un cliente.
- Manejo de errores HTTP 400 y 404.
- Mensaje ante un error general de consulta.
- Visualización del botón de eliminación para el rol Gerencia.
- Comprobaciones iniciales de datos de prueba.

Las llamadas al servicio de clientes se simularon durante las pruebas del componente, por lo que estas verificaciones no representan pruebas directas de integración con MongoDB ni con el backend real.

Las pruebas manuales de integración se documentan por separado.

## 6. Conclusión

Las pruebas manuales permitieron verificar la comunicación entre React, Express y MongoDB para las operaciones principales de consulta, visualización, creación y eliminación de clientes.

La integración básica funciona correctamente. Como mejora pendiente, se recomienda actualizar la lista de clientes automáticamente después de una creación exitosa, sin requerir una recarga manual de la página.

Las pruebas realizadas fueron manuales; no constituyen una suite automatizada de pruebas.

