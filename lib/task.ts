import { TaskStatus, TaskArgs, TaskResult, ITask, TaskCallback } from './types';

let taskIdCounter: number = 0;

const generateTaskId = (): string => {
  return `task_${++taskIdCounter}`;
};

export class Task<TArgs extends unknown[] = TaskArgs, TResult = TaskResult> implements ITask<TArgs, TResult> {
  cb: TaskCallback<TArgs, TResult>;
  args: TArgs;
  status: TaskStatus;
  id: string;
  result?: TResult;
  error?: Error;

  constructor(cb: TaskCallback<TArgs, TResult>, args: TArgs = [] as unknown as TArgs) {
    this.cb = cb;
    this.args = args;
    this.status = TaskStatus.PENDING;
    this.id = generateTaskId();
  }
}
