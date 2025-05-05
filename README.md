# Task Manager

A lightweight TypeScript utility for managing asynchronous task execution with controlled parallelism.

## Features

- Controlled parallel execution of async tasks (default: 10 concurrent tasks)
- FIFO queue-based execution
- Promise-based API with TypeScript type safety
- Task status tracking

## Usage

```typescript
import { cbManager } from './lib';

// Define an async task
const fetchData = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

// Add tasks to the queue
const promise1 = cbManager.addTask(fetchData, ['https://api.example.com/data1']);
const promise2 = cbManager.addTask(fetchData, ['https://api.example.com/data2']);

// Process all tasks and get results
const results = await Promise.all([promise1, promise2]);

// Check execution status
const status = cbManager.getStatus();
console.log(`Status: ${status.status}, Executing: ${status.executing}, Waiting: ${status.waiting}`);
```

## Custom Configuration

```typescript
import { CallbackManager } from './lib';

// Create manager with custom parallelism (3 concurrent tasks)
const customManager = new CallbackManager(3);

// Use the custom manager
const taskPromise = customManager.addTask(myAsyncFunction, [arg1, arg2]);
```

## API

### CallbackManager

- `new CallbackManager(maxParallelTasks?: number)` - Create a new manager
- `addTask<T>(callback: Function, args: any[]): Promise<T>` - Add a task to the queue
- `getStatus(): ManagerStatus` - Get execution status
- `reset(): void` - Reset manager state

### Default Constants

- Default maximum parallel tasks: 10
- Default task timeout: 30 seconds

## Architecture

- `CallbackManager`: Main entry point for task management
- `Task`: Represents an executable task
- `TaskProcessor`: Handles task execution
- Utility classes:
  - `QueueManager`: Manages waiting/executing task queues
  - `PromiseManager`: Handles promise resolution
  - `StatusManager`: Tracks execution status
