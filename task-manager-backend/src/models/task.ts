export type TaskStatus = 'pending' | 'completed' | 'canceled';

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  createdAt: Date;
}