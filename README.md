# Callback Manager

A TypeScript utility for managing asynchronous callbacks with controlled parallelism.

## Features

- Queue-based execution of asynchronous tasks
- Configurable maximum parallel execution
- FIFO (First-In-First-Out) task processing
- Task status tracking
- Promise-based API for easy integration
- Type-safe with TypeScript generics

## Installation

```bash
npm install callback-manager
```

## Basic Usage

```typescript
import { cbManager } from 'callback-manager';

// Define an async task function
const fetchData = async (url: string): Promise<Response> => {
  const response = await fetch(url);
  return response;
};

// Add tasks to the queue and get promises
const promise1 = cbManager.addTask(fetchData, ['https://api.example.com/data1']);
const promise2 = cbManager.addTask(fetchData, ['https://api.example.com/data2']);
const promise3 = cbManager.addTask(fetchData, ['https://api.example.com/data3']);

// Wait for all tasks to complete
const results = await Promise.all([promise1, promise2, promise3]);

// Check manager status
const status = cbManager.getStatus();
console.log(`Status: ${status.status}, Executing: ${status.executing}, Waiting: ${status.waiting}`);
```

## Advanced Usage

### Creating a Custom CallbackManager

```typescript
import { CallbackManager } from 'callback-manager';

// Create a custom manager with 5 maximum parallel tasks
const customManager = new CallbackManager(5);

// Use the custom manager
customManager.addTask(async () => {
  // Your async logic here
});
```

### Type-Safe Task Execution

```typescript
interface User {
  id: number;
  name: string;
}

// Type-safe task with specific arguments and return type
const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`https://api.example.com/users/${id}`);
  return response.json();
};

// TypeScript will infer the correct types
const userPromise = cbManager.addTask(fetchUser, [123]);
const user = await userPromise; // user is of type User
```

## Architecture

The library is organized into the following components:

### Core Classes

- `CallbackManager` - Main class for managing tasks
- `Task` - Represents a single task to be executed
- `TaskProcessor` - Handles the execution of a task

### Utility Classes

- `QueueManager` - Manages the task queues
- `PromiseManager` - Handles promise resolution for tasks
- `StatusManager` - Tracks execution status

### Types and Constants

- `TaskStatus` - Enum for task status (PENDING, RESOLVED, REJECTED)
- `ExecutionStatus` - Enum for manager status (NOT_STARTED, EXECUTING, FINISHED)
- `TASK_EXECUTION` - Constants for task execution configuration

## API Reference

### CallbackManager

```typescript
// Create a manager with a custom parallel limit
const manager = new CallbackManager(10);

// Add a task to the queue
const promise = manager.addTask(asyncFunction, [arg1, arg2]);

// Get current status
const status = manager.getStatus();

// Reset the manager state
manager.reset();
```

### Status Object

```typescript
{
  waiting: number;   // Number of tasks waiting to be executed
  executing: number; // Number of tasks currently executing
  status: ExecutionStatus; // Overall execution status
}
```

## License

MIT # task-executer
