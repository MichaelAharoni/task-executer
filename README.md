# Task Manager

A lightweight TypeScript utility for managing asynchronous task execution with controlled parallelism.

## Features

- Controlled parallel execution of async tasks (default: 10 concurrent tasks)
- FIFO queue-based execution
- Promise-based API with TypeScript type safety
- Task status tracking

## Pattern Detection Utilities

This project also includes pattern detection utilities for comparing strings:

### Standard Pattern Detection

`pattern-detection.ts` provides character pattern matching capabilities:

```typescript
import { validatePattern } from './solutions/patterns-detection/pattern-detection';

const result = validatePattern('abba', 'xyyx');
// result: { isPatternMatch: true, pattern: '0110' }
```

The standard implementation maps each unique character to sequential numbers (0, 1, 2...) and compares patterns.

### Binary Pattern Detection

`pattern-detection-binary.ts` offers an alternative implementation using binary representations with comma-separated values:

```typescript
import { validatePattern } from './solutions/patterns-detection-binary/pattern-detection-binary';

const result = validatePattern('abca', 'xyza');
// result: { isPatternMatch: true, pattern: '0,1,10,0' }
```

> **Note**: The binary pattern detection is a fun implementation that assigns binary values to characters in sequence (0, 1, 10, 11, etc.). This approach was developed through a collaborative conversation to explore alternative pattern representation.

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
