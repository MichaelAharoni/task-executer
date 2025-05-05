import { cbManager } from '../callback-manager';
import { TaskTracker, createSumTask, createTrackedTask, createFifoTestTask } from './test-helpers';
import { TASK_EXECUTION } from '../constants';

describe('CallbackManager', () => {
  beforeEach(() => {
    cbManager.reset();
  });
  it('should execute a callback with arguments', async () => {
    const result = await cbManager.addTask(createSumTask, [5, 7]);
    expect(result).toBe(12);
  });

  it(`should execute no more than ${TASK_EXECUTION.MAX_PARALLEL} tasks in parallel`, async () => {
    // Create a tracker to monitor task execution
    const tracker = new TaskTracker();

    // Create an array to store promises for all tasks
    const taskPromises: Promise<string>[] = [];

    // Create more tasks than the maximum parallel limit
    const totalTasks = TASK_EXECUTION.MAX_PARALLEL * 2;

    for (let i = 0; i < totalTasks; i++) {
      const taskId = `task_${i + 1}`;
      const task = createTrackedTask(taskId, 50, tracker); // Each task takes 50ms
      taskPromises.push(cbManager.addTask(task));
    }

    await Promise.all(taskPromises);

    expect(tracker.getMaxConcurrent()).toBeLessThanOrEqual(TASK_EXECUTION.MAX_PARALLEL);
    expect(tracker.getMaxConcurrent()).toBe(TASK_EXECUTION.MAX_PARALLEL);
    expect(tracker.getExecutionOrder().length).toBe(totalTasks);
  }, 10000); // Increase timeout to 10 seconds for this test

  it('should execute tasks in the order they were added (FIFO)', async () => {
    const tracker = new TaskTracker();

    // To test FIFO behavior we'll add tasks with increasing delays
    // The execution order should still match the order they were added
    const taskPromises: Promise<string>[] = [];
    const totalTasks = 10;

    for (let i = 0; i < totalTasks; i++) {
      const taskId = `fifo_${i + 1}`;
      const task = createFifoTestTask(taskId, i, tracker);
      taskPromises.push(cbManager.addTask(task));
    }

    await Promise.all(taskPromises);

    // Check FIFO order by comparing task IDs - the execution order should match adding order
    for (let i = 0; i < Math.min(totalTasks, TASK_EXECUTION.MAX_PARALLEL); i++) {
      expect(tracker.getExecutionOrder()[i]).toBe(`fifo_${i + 1}`);
    }
  }, 5000); // Increase timeout for this test
});
