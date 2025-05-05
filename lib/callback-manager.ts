import { ManagerStatus, ITask, TaskCallback, TaskArgs, TaskResult } from './types';
import { TaskProcessor } from './task-processor';
import { TASK_EXECUTION } from './constants';
import { Task } from './task';
import { QueueManager } from './utils/queue-manager';
import { PromiseManager } from './utils/promise-manager';
import { StatusManager } from './utils/status-manager';

/**
 * CallbackManager handles the management of asynchronous tasks
 * It uses utility classes to manage queues, promises and status
 */
export class CallbackManager {
  private queueManager: QueueManager;
  private promiseManager: PromiseManager;
  private statusManager: StatusManager;
  private maxParallelTasks: number;
  private processingQueue: boolean = false;

  constructor(maxParallelTasks: number = TASK_EXECUTION.MAX_PARALLEL) {
    this.maxParallelTasks = maxParallelTasks;
    this.queueManager = new QueueManager();
    this.promiseManager = new PromiseManager();
    this.statusManager = new StatusManager();
  }

  reset(): void {
    this.queueManager.reset();
    this.promiseManager.reset();
    this.statusManager.reset();
    this.processingQueue = false;
  }

  addTask<TArgs extends unknown[] = TaskArgs, TResult = TaskResult>(
    callback: TaskCallback<TArgs, TResult>,
    args: TArgs = [] as unknown as TArgs
  ): Promise<TResult> {
    const task = new Task<TArgs, TResult>(callback, args);
    this.queueManager.addToWaitingQueue(task);

    const taskPromise = this.promiseManager.createPromise<TResult>(task.id);
    this.processQueue();

    return taskPromise;
  }

  private processQueue(): void {
    if (this.processingQueue) {
      return;
    }

    this.processingQueue = true;
    this.statusManager.startExecution();

    try {
      while (this.queueManager.getExecutingCount() < this.maxParallelTasks && this.queueManager.getWaitingCount() > 0) {
        const nextTask = this.queueManager.moveNextTaskToExecution();
        if (nextTask) {
          this.executeTask(nextTask);
        }
      }
    } finally {
      this.processingQueue = false;
    }

    this.updateStatus();
  }

  private updateStatus(): void {
    this.statusManager.updateStatus(this.queueManager.getWaitingCount(), this.queueManager.getExecutingCount());
  }

  private async executeTask<TResult = TaskResult>(task: ITask<TaskArgs, TResult>): Promise<void> {
    try {
      await TaskProcessor.execute(task);

      if (task.error) {
        this.promiseManager.rejectPromise(task.id, task.error);
      } else {
        this.promiseManager.resolvePromise(task.id, task.result);
      }
    } catch (error) {
      const typedError = error instanceof Error ? error : new Error(String(error));
      this.promiseManager.rejectPromise(task.id, typedError);
    } finally {
      this.queueManager.completeTask(task.id);
      this.processQueue();
    }
  }

  getStatus(): ManagerStatus {
    return this.statusManager.getStatus(this.queueManager.getWaitingCount(), this.queueManager.getExecutingCount());
  }
}

/**
 * Singleton instance of the CallbackManager
 */
export const cbManager = new CallbackManager();
export default cbManager;
