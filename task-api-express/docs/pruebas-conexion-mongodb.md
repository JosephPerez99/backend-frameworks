# Pruebas de conexión con MongoDB Atlas

## Entorno verificado

- Rama: `feature/mongodb-atlas`
- Comando de tipos: `pnpm check` — aprobado
- Comando de compilación: `pnpm build` — aprobado
- `.env` ignorado por Git: confirmado con `git check-ignore -v .env`
- Resultado de arranque: API iniciada y conectada con MongoDB Atlas

## Casos ejecutados

Completa las columnas de resultado después de ejecutar cada prueba. No incluyas la URI, la contraseña ni capturas que las muestren.

| Tipo | Método y ruta | Datos | Esperado | Obtenido | requestId | Resultado |
|---|---|---|---|---|---|---|
| Positiva | GET /health | No aplica | 200 | 200; `status: ok` | | Aprobada |
| Positiva | GET /health/database | No aplica | 200 connected | 200; `data.database.status: connected` | | Aprobada |
| Regresión | GET /api/tasks | No aplica | 200 | 200; devolvió 2 tareas | | Aprobada |
| Regresión | POST /api/tasks | title válido | 201 | 201; creó tarea `id: 3`, `status: pending` | | Aprobada |
| Negativa | GET /api/tasks/abc | No aplica | 400 INVALID_ID | 400; `INVALID_ID` | `b66fba43-f09a-4f5e-bbf0-3262c0098e79` | Aprobada |
| Negativa | POST /api/tasks | raw Text | 415 UNSUPPORTED_MEDIA_TYPE | 415; `UNSUPPORTED_MEDIA_TYPE` | `ce578eed-4986-4111-b504-d21b1c48c801` | Aprobada |
| Infraestructura | Inicio con contraseña temporalmente incorrecta, solo en el proceso de prueba | No aplica | API no escucha | Inicio rechazado; exit code 1 | No aplica | Aprobada |

## Evidencias

1. Captura del despliegue disponible sin mostrar usuarios ni credenciales — pendiente.
2. Captura de `GET /health/database` — pendiente.
3. Capturas de una prueba correcta, una validación y una regla del negocio — pendiente.
4. `pnpm check` y `pnpm build` ejecutados correctamente.
5. `git check-ignore -v .env` confirmó que `.env` está ignorado.

La prueba de contraseña incorrecta usó una URI temporal en el entorno del proceso; el archivo `.env` y sus credenciales no se modificaron.
