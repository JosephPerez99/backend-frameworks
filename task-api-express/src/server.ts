import 'dotenv/config';

import { app } from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { loadEnvironment } from './config/env.js';

const startServer = async (): Promise<void> => {
  try {
    const env = loadEnvironment();
    await connectDatabase({
      uri: env.mongodbUri,
      dbName: env.mongodbDbName
    });

    const server = app.listen(env.port, () => {
      console.log(`API disponible en http://localhost:${env.port}`);
    });

    let shuttingDown = false;

    const shutdown = (): void => {
      if (shuttingDown) {
        return;
      }

      shuttingDown = true;

      void (async (): Promise<void> => {
        try {
          await new Promise<void>((resolve, reject) => {
            server.close((error) => {
              if (error) {
                reject(error);
                return;
              }

              resolve();
            });
          });
        } catch {
          console.error('No fue posible cerrar el servidor HTTP de forma ordenada.');
          process.exitCode = 1;
        }

        try {
          await disconnectDatabase();
          console.log('Servidor HTTP y conexión con MongoDB cerrados.');
        } catch {
          console.error('No fue posible cerrar la conexión con MongoDB de forma ordenada.');
          process.exitCode = 1;
        }
      })();
    };

    process.once('SIGINT', shutdown);
    process.once('SIGTERM', shutdown);
  } catch {
    console.error(
      'No fue posible iniciar la API. Revise MONGODB_URI, ' +
        'el usuario y la lista de acceso de red.'
    );
    process.exitCode = 1;
  }
};

void startServer();