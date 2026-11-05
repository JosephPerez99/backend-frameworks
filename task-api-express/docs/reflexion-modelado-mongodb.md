# Reflexión sobre modelado y persistencia en MongoDB

> Borrador de apoyo basado en el código del proyecto. Revisa y expresa las respuestas con tus propias palabras antes de entregar.

1. **¿Qué diferencia existe entre un documento, un esquema y un modelo?**  
   Un documento es una tarea concreta guardada en la colección `tasks`. El esquema define las reglas que debe cumplir, como los límites de `title` y `description`, el estado permitido y las marcas de tiempo. El modelo `TaskModel` es la interfaz de Mongoose que aplica esas reglas y permite consultar o modificar documentos.

2. **¿Por qué la API devuelve `id` en lugar de `_id`?**  
   `_id` es el nombre interno que MongoDB usa para identificar el documento. El servicio lo convierte a texto y lo expone como `id`, manteniendo una respuesta sencilla y evitando acoplar al cliente a la estructura interna de MongoDB.

3. **¿Qué problema evita migrar todas las operaciones a una sola fuente de datos?**  
   Evita que una tarea creada en Atlas se lea, complete o elimine desde un arreglo diferente en memoria. Una sola fuente de verdad mantiene coherentes todas las rutas y permite que los datos sobrevivan al reinicio del proceso.

4. **¿Qué reglas aplica el middleware y cuáles repite el esquema?**  
   El middleware valida la entrada HTTP: que `title` sea texto no vacío de hasta 120 caracteres y que, si se envía, `description` sea texto de hasta 300 caracteres. El esquema repite los límites y recorta espacios para proteger la persistencia incluso si los documentos se crean desde otro punto de la aplicación.

5. **¿Qué diferencia existe entre `INVALID_ID` y `TASK_NOT_FOUND`?**  
   `INVALID_ID` indica que el valor de la URL no tiene el formato de un ObjectId de 24 caracteres hexadecimales. `TASK_NOT_FOUND` indica que el ObjectId sí tiene un formato correcto, pero no corresponde a ningún documento existente.

6. **¿Qué hacen `timestamps` y `versionKey: false`?**  
   `timestamps` hace que Mongoose administre `createdAt` y `updatedAt` en las escrituras. `versionKey: false` evita agregar el campo `__v`, que esta API no necesita para control de versiones.

7. **¿Por qué los controladores deben usar `async` y `await`?**  
   Las consultas de Mongoose son asíncronas. `await` permite esperar el resultado antes de construir la respuesta, y `async` hace que los rechazos se propaguen como errores de la ruta.

8. **¿Cómo llega un `AppError` asíncrono al `errorHandler` de Express 5?**  
   Cuando una ruta asíncrona rechaza o lanza un error, Express 5 lo pasa automáticamente al siguiente middleware de error. El `errorHandler` reconoce `AppError` y produce el formato uniforme con código, mensaje, detalles disponibles y `requestId`.

9. **¿Qué prueba demuestra realmente que una tarea es persistente?**  
   Crear la tarea, guardar el `id`, detener y reiniciar la API, y después consultar ese mismo `id` para recuperar el documento. Ver el documento en Atlas complementa esa prueba.

10. **¿Qué información de Mongoose o Atlas nunca debe aparecer en la respuesta HTTP?**  
    No se deben enviar la URI, contraseñas, detalles internos de servidores, trazas de pila ni objetos completos de Mongoose. La API debe devolver mensajes y códigos seguros, sin datos de diagnóstico sensibles.
