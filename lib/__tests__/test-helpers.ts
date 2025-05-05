export const createDelayedTask = <T>(result: T, delay: number = 100) => {
  return async (): Promise<T> => {
    return new Promise<T>((resolve) => {
      setTimeout(() => {
        resolve(result);
      }, delay);
    });
  };
};

export const createCalculationTask = <T>(operation: (...args: any[]) => T) => {
  return async (...args: any[]): Promise<T> => {
    return operation(...args);
  };
};

export const createSumTask = async (a: number, b: number) => a + b;

export const createTrackedTask = (id: string, executionTime: number, tracker: TaskTracker) => {
  return async () => {
    tracker.startTask(id);
    await delay(executionTime);
    tracker.endTask(id);
    return id;
  };
};

export const createFifoTestTask = (id: string, index: number, tracker: TaskTracker) => {
  return async () => {
    tracker.startTask(id);
    // Reverse the delay so later tasks finish sooner
    await delay(100 - index * 10);
    tracker.endTask(id);
    return id;
  };
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export class TaskTracker {
  private executionOrder: string[] = [];
  private maxConcurrent: number = 0;
  private currentConcurrent: number = 0;
  private executionTimes: Map<string, { start: number; end?: number }> = new Map();

  startTask(taskId: string): void {
    this.executionOrder.push(taskId);
    this.currentConcurrent++;
    this.maxConcurrent = Math.max(this.maxConcurrent, this.currentConcurrent);
    this.executionTimes.set(taskId, { start: Date.now() });
  }

  endTask(taskId: string): void {
    this.currentConcurrent--;
    const timing = this.executionTimes.get(taskId);
    if (timing) {
      timing.end = Date.now();
    }
  }

  getExecutionOrder(): string[] {
    return [...this.executionOrder];
  }

  getMaxConcurrent(): number {
    return this.maxConcurrent;
  }

  getExecutionTimes(): Map<string, { start: number; end?: number }> {
    return this.executionTimes;
  }

  reset(): void {
    this.executionOrder = [];
    this.maxConcurrent = 0;
    this.currentConcurrent = 0;
    this.executionTimes.clear();
  }
}
