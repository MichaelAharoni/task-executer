import { ExecutionStatus, ManagerStatus } from '../types';

/**
 * Manages the execution status of the callback manager
 */
export class StatusManager {
  private executionStatus: ExecutionStatus = ExecutionStatus.NOT_STARTED;

  updateStatus(waitingCount: number, executingCount: number): void {
    const isExecuting = executingCount > 0;
    const isWaiting = waitingCount > 0;
    const isNotStartedStatus = this.executionStatus === ExecutionStatus.NOT_STARTED;

    if (!isExecuting && !isWaiting) {
      this.executionStatus = ExecutionStatus.FINISHED;
    } else if (isExecuting || isWaiting) {
      if (isNotStartedStatus) {
        this.executionStatus = ExecutionStatus.EXECUTING;
      }
    }
  }

  getStatus(waitingCount: number, executingCount: number): ManagerStatus {
    return {
      waiting: waitingCount,
      executing: executingCount,
      status: this.executionStatus,
    };
  }

  reset(): void {
    this.executionStatus = ExecutionStatus.NOT_STARTED;
  }

  startExecution(): void {
    if (this.executionStatus === ExecutionStatus.NOT_STARTED) {
      this.executionStatus = ExecutionStatus.EXECUTING;
    }
  }

  getCurrentStatus(): ExecutionStatus {
    return this.executionStatus;
  }
}
