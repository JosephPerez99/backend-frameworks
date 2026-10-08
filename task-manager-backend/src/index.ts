import {
  createTask,
  completeTask,
  deleteTask,
  listPendingTasks,
  listTasks
} from './services/task.service.js';

import { delay } from './utils/delay.js';
import { getAppName } from './utils/env.js';

const showTasks = (): void => {
  const rows = listTasks().map((task) => ({
    id: task.id,
    title: task.title,
    status: task.status,
    createdAt: task.createdAt.toLocaleString()
  }));

  console.table(rows);
};

const main = async () => {
  console.log(`\n${getAppName()}`);
  console.log('Iniciando aplicación...');

  await delay(300);

  console.log('\nTareas iniciales');
  showTasks();

  const newTask = createTask('Construir mi primer servicio');
  console.log(`Tarea creada con id ${newTask.id}.`);

  completeTask(newTask.id);
  console.log(`Tarea ${newTask.id} completada.`);

  console.log('\nEstado final');
  showTasks();

  console.log('\nTareas pendientes');
  console.table(listPendingTasks());

  try {
    const deletedTask = deleteTask(2);
    console.log(`Tarea ${deletedTask.id} eliminada correctamente.`);
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Ocurrió un error desconocido.';

    console.error(`Error al eliminar: ${message}`);
  }

  try {
    deleteTask(999);
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Ocurrió un error desconocido.';

    console.error(`Error al eliminar: ${message}`);
  }

  console.log('\nEstado después de eliminar');
  showTasks();

  try {
    completeTask(999);
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Ocurrió un error desconocido.';

    console.error(`Error controlado: ${message}`);
  }
};

main().catch((error: unknown) => {
  console.error('Error no controlado:', error);
  process.exitCode = 1;
});