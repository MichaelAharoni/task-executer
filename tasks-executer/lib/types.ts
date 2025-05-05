
export enum TaskStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

export enum ExecutionStatus {
  NOT_STARTED = 'not_started',
  EXECUTING = 'executing',
  FINISHED = 'finished',
}

export type TaskArgs = any[];
export type TaskResult = unknown;
export type TaskCallback<
  TArgs extends unknown[] = TaskArgs,
  TResult = TaskResult
> = (...args: TArgs) => Promise<TResult>;

export interface ITask<
  TArgs extends unknown[] = TaskArgs,
  TResult = TaskResult
> {
  cb: TaskCallback<TArgs, TResult>;
  args: TArgs;
  status: TaskStatus;
  id: string;
  result?: TResult;
  error?: Error;
}

export interface PromiseHandlers<TResult = TaskResult> {
  resolve: (value: TResult | PromiseLike<TResult>) => void;
  reject: (reason: any) => void;
}

export interface TaskPromiseHash {
  [taskId: string]: PromiseHandlers<unknown>;
}

export interface ManagerStatus {
  waiting: number;
  executing: number;
  status: ExecutionStatus;
}
