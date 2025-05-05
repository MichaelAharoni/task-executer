import { ITask } from '../types';

/**
 * Manages the task queues for the callback manager
 */
export class QueueManager {
  private waitingQueue: ITask[] = [];
  private executingTasks: ITask[] = [];
  private completedTasks: ITask[] = [];

  addToWaitingQueue(task: ITask): void {
    this.waitingQueue.push(task);
  }

  moveNextTaskToExecution(): ITask | undefined {
    const nextTask = this.waitingQueue.shift();
    if (nextTask) {
      this.executingTasks.push(nextTask);
    }
    return nextTask;
  }

  completeTask(taskId: string): void {
    const taskIndex = this.executingTasks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
      const [completedTask] = this.executingTasks.splice(taskIndex, 1);
      this.completedTasks.push(completedTask);
    }
  }

  getWaitingCount(): number {
    return this.waitingQueue.length;
  }

  getExecutingCount(): number {
    return this.executingTasks.length;
  }

  reset(): void {
    this.waitingQueue = [];
    this.executingTasks = [];
    this.completedTasks = [];
  }

  hasActiveTasks(): boolean {
    return this.waitingQueue.length > 0 || this.executingTasks.length > 0;
  }
}
