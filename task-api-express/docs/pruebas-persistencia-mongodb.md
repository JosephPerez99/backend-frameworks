# Pruebas de modelado y persistencia

## Entorno

- Rama: `feature/modelo-tareas-mongodb`
- Base esperada: `task_api`
- Colección esperada: `tasks`
- Resultado de `pnpm check`: aprobado
- Resultado de `pnpm build`: aprobado
- `.env`: ignorado por Git; no debe aparecer en evidencias

## Documento comprobado

- `id` devuelto por la API: `6aec41a3156b7345c12e17a4`
- Campos observados en Atlas: documento localizado en `task_api.tasks`; verificado por el alumno
- Resultado después de reiniciar: GET por ID respondió 200 con la misma tarea
- `description` válida: respuesta recibida con `description: "Revisar persistencia en Atlas"` sin espacios externos; ID `6aec9fc5156b7345c12e17ab`
- `description` omitida: POST respondió 201 y no incluyó el campo; ID `6aeca1b5156b7345c12e17ad`
- `description` de 301 caracteres: respuesta `VALIDATION_ERROR`, detalle `description`; estado HTTP por confirmar

## Casos ejecutados

Completa «Obtenido», `requestId` y «Resultado» después de ejecutar las solicitudes contra tu instancia de Atlas. No incluyas la URI, el usuario ni credenciales.

| Tipo | Método y ruta | Datos | Esperado | Obtenido | requestId | Resultado |
|---|---|---|---|---|---|---|
| Salud | GET /health | Sin cuerpo | 200, `status: ok` | 200, `status: ok` | | Aprobada |
| Salud | GET /health/database | Sin cuerpo | 200, base conectada | 200, `connected` | | Aprobada |
| Persistencia | POST /api/tasks | `title` válido | 201 | 201, tarea creada con `id: 6aec41a3156b7345c12e17a4` | | Aprobada |
| Desafío | POST /api/tasks | `description` válida con espacios externos | 201 | Respuesta devuelve `description: "Revisar persistencia en Atlas"` sin espacios externos; estado HTTP no compartido | | Parcial |
| Desafío | POST /api/tasks | Solo `title`, sin `description` | 201, campo `description` omitido | 201; campo omitido; ID `6aeca1b5156b7345c12e17ad` | | Aprobada |
| Persistencia | GET /api/tasks | Sin cuerpo | 200, tarea incluida | 200, tarea incluida | | Aprobada |
| Persistencia | GET /api/tasks/{{taskId}} | ID devuelto por POST | 200, misma tarea | 200, misma tarea | | Aprobada |
| Persistencia | Reinicio y GET /api/tasks/{{taskId}} | ID guardado antes del reinicio | 200, misma tarea | 200, misma tarea después de reiniciar | | Aprobada |
| Regresión | PATCH /api/tasks/{{taskId}}/complete | Sin cuerpo | 200, `status: completed` | 200, `completed`; `updatedAt` cambió | | Aprobada |
| Regresión | DELETE /api/tasks/{{taskId}} | Sin cuerpo | 204 | Reportado como exitoso; código no recordado | | Reportada |
| Regresión | GET /api/tasks/{{taskId}} después de eliminar | ID eliminado | 404, `TASK_NOT_FOUND` | 404, `TASK_NOT_FOUND` | | Aprobada |
| Negativa | GET /api/tasks/1 | Sin cuerpo | 400, `INVALID_ID` | Pendiente | | |
| Negativa | GET /api/tasks/6aec41a3156b7345c12e17a4 | ObjectId válido eliminado anteriormente | 404, `TASK_NOT_FOUND` | 404, `TASK_NOT_FOUND` | | Aprobada |
| Negativa | GET /api/tasks/1 | Sin cuerpo | 400, `INVALID_ID` | 400, error de ID inválido | | Aprobada |
| Negativa | POST /api/tasks | `title` vacío | 422, `VALIDATION_ERROR` | 422, `VALIDATION_ERROR`, detalle `title` | `8cf09410-9080-4888-954e-a1cc26df82d8` | Aprobada |
| Negativa | POST /api/tasks | `title` de 121 caracteres | 422, `VALIDATION_ERROR` | 422; cuerpo de error no compartido | | Estado confirmado; código por confirmar |
| Negativa | POST /api/tasks | `description` de 301 caracteres | 422, detalle `description` | Cuerpo `VALIDATION_ERROR`, detalle `description`; estado HTTP por confirmar | `9275c733-4090-4d02-8f91-ef9490b5c143` | Parcial |
| Negativa | POST /api/tasks | `Content-Type: text/plain` | 415, `UNSUPPORTED_MEDIA_TYPE` | Pendiente | | |
| Infraestructura | Inicio con contraseña incorrecta derivada temporalmente de `.env` | Sin solicitud HTTP | La API no inicia ni abre el puerto | Inicio rechazado con salida 1; puerto temporal 3012 sin listener | No aplica | Aprobada |

## Evidencias pendientes

1. Captura o salida de `pnpm check` y `pnpm build` — ambos comandos terminaron correctamente en esta revisión.
2. Respuesta de POST y documento visible en Atlas, sin credenciales.
3. Consulta de la tarea después de reiniciar la API.
4. Una respuesta de error de formato, una de validación y una de tarea inexistente, con sus `requestId`.
5. Pruebas del desafío: descripción válida, ausente y de 301 caracteres.
6. Inicio rechazado con contraseña temporal incorrecta: probado sin modificar `.env` ni mostrar credenciales.

No se deben afirmar resultados de Atlas o Postman hasta ejecutar esas comprobaciones en el entorno propio.
