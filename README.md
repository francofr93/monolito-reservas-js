# Proyecto integrador de Arquitectura de Software — Semana 5 en JavaScript

## Flujos disponibles

- `POST /api/reservations`: valida y registra una reserva.
- `GET /api/reservations`: consulta las reservas ordenadas por fecha de inicio.
- `GET /health`: comprueba que la API responde.
- `GET /openapi.yaml`: publica el contrato de `docs/openapi.yaml`.

## Estructura por capas

```text
src/
├── presentation/   rutas y controlador HTTP
├── application/    casos de uso y validación
├── persistence/    consultas SQL y conversión de filas
├── domain/         documentación del modelo de reserva con JSDoc
├── app.js          composición de las capas y middleware Express
└── server.js       configuración del servidor y del pool PostgreSQL
```

El flujo sigue presentación → aplicación → persistencia → PostgreSQL. La estructura es equivalente a la versión TypeScript; en JavaScript el modelo no se declara con `interface`, por eso `src/domain/reservation.js` documenta su forma con JSDoc. Las validaciones importantes se realizan en tiempo de ejecución.

## Requisitos

- Node.js 24 o superior y npm.
- Docker Desktop con Docker Compose.
- Git, si se trabajará con el repositorio del equipo.

## Instalar y ejecutar

Abre PowerShell en la carpeta `starter-project` de esta versión:

```powershell
Copy-Item .env.example .env
npm ci
docker compose up -d db
npm run dev
```

La API queda disponible en `http://localhost:3000`. PostgreSQL inicializa la tabla desde `db/init/001_create_reservations.sql`. El archivo `.env` contiene la configuración local y está excluido de Git.

Para detener el contenedor de base de datos:

```powershell
docker compose down
```

## Probar los flujos manualmente

Crear una reserva:

```powershell
$body = @{
  customerName = "Ana Pérez"
  resourceName = "Sala A"
  startsAt = "2026-11-10T14:00:00-05:00"
  endsAt = "2026-11-10T15:00:00-05:00"
} | ConvertTo-Json

Invoke-RestMethod -Method Post `
  -Uri http://localhost:3000/api/reservations `
  -ContentType "application/json" `
  -Body $body
```

Consultar reservas:

```powershell
Invoke-RestMethod -Method Get -Uri http://localhost:3000/api/reservations
```

La creación responde `201`; los datos inválidos responden `400`; la consulta responde `200`.

## Consultar el contrato OpenAPI

Abre `http://localhost:3000/openapi.yaml` para ver el YAML servido por la aplicación. Para explorar las operaciones visualmente, importa `docs/openapi.yaml` en Swagger Editor.

## Ejecutar las pruebas automatizadas

En otra terminal, desde la raíz de `starter-project`:

```powershell
npm test
```

Vitest ejecuta las pruebas unitarias del servicio, las pruebas del repositorio con una consulta simulada y las pruebas HTTP de Express. No hace falta levantar PostgreSQL para esas pruebas; la comprobación manual anterior sí usa la base de datos real.

## JavaScript y TypeScript en clase

En TypeScript, `interface` y las anotaciones describen tipos y el proyecto usa una herramienta para ejecutar o compilar el código. En esta versión, los archivos son `.js`, las importaciones relativas incluyen la extensión `.js` y Node ejecuta el código directamente. La forma de los objetos se documenta con JSDoc y los datos externos se validan en tiempo de ejecución.
