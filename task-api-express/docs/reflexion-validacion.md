# Reflexión sobre validación y manejo centralizado de errores

1. ¿Qué diferencia existe entre validar el formato HTTP y proteger una regla del negocio?
   La validación HTTP comprueba que la solicitud cumple con la estructura esperada: método, encabezados, tipo de contenido y parámetros de la URL. La regla del negocio protege invariantes de la aplicación, por ejemplo que una tarea exista antes de actualizarla o que el título no esté vacío después de normalizarlo. En la API, `requireJson` y `validateTaskTitle` pertenecen a la validación HTTP, mientras que `findTaskById` y `createTask` garantizan la integridad del dominio.

2. ¿Por qué conviene usar router.param para validar el id?
   Porque centraliza la regla de validación para todas las rutas con `:id` y evita duplicar la lógica en cada controlador. Si un cliente envía `abc`, la API responde con `400 INVALID_ID` antes de llegar a la lógica de negocio, sin repetir conversiones ni comprobaciones.

3. ¿Qué ventaja ofrece guardar datos normalizados en res.locals?
   Permite compartir información segura y ya procesada entre middleware, rutas y controladores sin pasar parámetros complejos entre funciones. Por ejemplo, `validateTaskId` almacena el id como número y `validateTaskTitle` guarda el título ya limpiado, así el controlador recibe datos listos para usar.

4. ¿Cuándo corresponde responder 400 y cuándo 422?
   El código 400 se usa cuando la solicitud no puede interpretarse, como un id no numérico o JSON malformado. El 422 se usa cuando el JSON es válido pero los datos no cumplen las reglas del negocio o de la validación de campos, como un título vacío o un `completed` que no es booleano.

5. ¿Por qué notFound delega el error en lugar de responder directamente?
   Porque todas las respuestas de error deben pasar por el mismo manejador central, que garantiza una estructura uniforme, un `requestId` y el mismo formato JSON para cualquier error. Esto evita duplicar lógica y mantiene la API consistente.

6. ¿Qué información no debe enviarse al cliente en un error 500?
   No debe enviarse el stack trace, detalles internos del servidor, mensajes de depuración ni información sensible sobre configuración, variables de entorno o excepciones internas. El cliente solo debe recibir un mensaje general como `Ocurrió un error interno.` y un `requestId` para relacionarlo con el log del servidor.

7. ¿Cómo ayuda requestId durante la depuración?
   El `requestId` se genera por cada solicitud y se guarda en `res.locals` y en la cabecera `X-Request-Id`. Cuando un cliente reporta un problema, el desarrollador puede buscar ese identificador en los logs para correlacionar la respuesta con la ejecución exacta del servidor.

8. ¿Qué prueba demuestra que la refactorización no rompió la API anterior?
   La prueba de regresión con `PATCH /api/tasks/:id/complete` y `DELETE /api/tasks/:id` demuestra que las operaciones ya funcionales siguen respondiendo correctamente después de añadir validación, middleware y manejo centralizado de errores. Además, las rutas originales `/api/tasks` y `/api/tasks/:id` siguen funcionando con la misma lógica del servicio.
