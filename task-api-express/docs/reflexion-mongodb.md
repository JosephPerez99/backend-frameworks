# Reflexión sobre MongoDB Atlas

Responde con tus propias palabras y ejemplos de la aplicación.

1. ¿Qué diferencia existe entre tu cuenta de Atlas y el usuario de base de datos?
   Respuesta:

2. ¿Por qué MONGODB_URI se considera un secreto aunque el repositorio sea privado?
   Respuesta:

3. ¿Qué riesgo introduce permitir 0.0.0.0/0 en la lista de acceso?
   Respuesta:

4. ¿Por qué la API espera connectDatabase antes de ejecutar app.listen?
   Respuesta:

5. ¿Qué comprueba readyState y qué añade el comando ping?
   Respuesta:

6. ¿Por qué una falla de MongoDB corresponde a infraestructura y no a validación HTTP?
   Respuesta:

7. ¿Cómo llega un AppError lanzado por getDatabaseHealth al manejador central en Express 5?
   Respuesta:

8. ¿Qué pruebas demuestran que la incorporación de Atlas no rompió la API anterior?
   Respuesta:

9. ¿Por qué el arreglo en memoria se conserva todavía en esta actividad?
   Respuesta:

10. ¿Qué información debe ocultarse al cliente cuando ocurre un error de conexión?
    Respuesta:

## Desafío individual: cierre ordenado

La API implementa el cierre ante `SIGINT` y `SIGTERM`: primero deja de aceptar solicitudes y cierra el servidor HTTP, y después desconecta Mongoose. La protección evita ejecutar el flujo de cierre más de una vez.

Completa con tus propias palabras la explicación de por qué conviene liberar la conexión:

Respuesta:

Prueba manual pendiente: iniciar la API con Atlas disponible, pulsar Ctrl+C y comprobar que termina sin un error no controlado.
