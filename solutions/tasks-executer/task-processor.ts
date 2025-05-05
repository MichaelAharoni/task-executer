import { TaskStatus, TaskArgs, TaskResult, ITask } from './types';

/**
 * Handles the execution of a single task and updates its status based on the result
 */
export class TaskProcessor {
  static async execute<TArgs extends unknown[] = TaskArgs, TResult = TaskResult>(
    task: ITask<TArgs, TResult>
  ): Promise<ITask<TArgs, TResult>> {
    try {
      task.result = await task.cb(...task.args);
      task.status = TaskStatus.RESOLVED;
    } catch (error) {
      task.error = error instanceof Error ? error : new Error(String(error));
      task.status = TaskStatus.REJECTED;
    }

    return task;
  }
}
