import { PromiseHandlers, TaskPromiseHash, TaskResult } from '../types';

/**
 * Manages promises for tasks in the callback manager
 */
export class PromiseManager {
  private taskPromises: TaskPromiseHash = {};

  createPromise<TResult = TaskResult>(taskId: string): Promise<TResult> {
    return new Promise<TResult>((resolve, reject) => {
      this.taskPromises[taskId] = {
        resolve: ((value: unknown) => resolve(value as TResult)) as PromiseHandlers<unknown>['resolve'],
        reject,
      };
    });
  }

  resolvePromise(taskId: string, result: unknown): void {
    const promiseHandlers = this.taskPromises[taskId];
    if (promiseHandlers) {
      promiseHandlers.resolve(result);
      this.removePromise(taskId);
    }
  }

  rejectPromise(taskId: string, error: Error): void {
    const promiseHandlers = this.taskPromises[taskId];
    if (promiseHandlers) {
      promiseHandlers.reject(error);
      this.removePromise(taskId);
    }
  }

  private removePromise(taskId: string): void {
    delete this.taskPromises[taskId];
  }

  reset(): void {
    this.taskPromises = {};
  }
}
