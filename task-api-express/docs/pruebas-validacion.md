# Pruebas de validación y errores

| Caso | Método y ruta | Datos enviados | Esperado | Obtenido | requestId | Resultado |
|---|---|---|---|---|---|---|
| ID no numérico | GET /api/tasks/abc | No aplica | 400 INVALID_ID | | | |
| Tarea inexistente | GET /api/tasks/999 | No aplica | 404 TASK_NOT_FOUND | | | |
| Obtener tareas | GET /api/tasks | No aplica | 200 | | | |
| Crear tarea válida | POST /api/tasks | {"title":"Revisar requisitos"} | 201 | | | |
| Content-Type no JSON | POST /api/tasks | Raw text sin Content-Type | 415 UNSUPPORTED_MEDIA_TYPE | | | |
| Título vacío | POST /api/tasks | {"title":""} | 422 VALIDATION_ERROR | | | |
| Título no textual | POST /api/tasks | {"title":25} | 422 VALIDATION_ERROR | | | |
| JSON inválido | POST /api/tasks | JSON malformado | 400 INVALID_JSON | | | |
| Ruta inexistente | GET /ruta-inexistente | No aplica | 404 ROUTE_NOT_FOUND | | | |
| Completar tarea válida | PATCH /api/tasks/1/complete | No aplica | 200 | | | |
| Eliminar tarea válida | DELETE /api/tasks/2 | No aplica | 204 | | | |
| Error 500 controlado | GET /debug/error | No aplica | 500 INTERNAL_ERROR | | | |
| PATCH con título válido | PATCH /api/tasks/1 | {"title":"Tarea actualizada"} | 200 | | | |
| PATCH con título vacío | PATCH /api/tasks/1 | {"title":""} | 422 VALIDATION_ERROR | | | |
| PATCH con valor no booleano | PATCH /api/tasks/1/status | {"completed":"true"} | 422 VALIDATION_ERROR | | | |
| PATCH status válido | PATCH /api/tasks/1/status | {"completed":true} | 200 | | | |

La cabecera `X-Request-Id` debe coincidir con el valor incluido en `error.requestId` en cada respuesta con error. Las capturas de Postman deben mostrar al menos una respuesta de cada tipo: 400, 404, 415, 422 y 500, además de una operación correcta.
