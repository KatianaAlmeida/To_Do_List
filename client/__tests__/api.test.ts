import { getAllTasks, addTask, editTask, deleteTask } from '../api';
import fetchMock from 'jest-fetch-mock';
import { InterfaceTask, InterfaceIDTask } from '../types/tasks';
export interface InterfaceTaskWithID extends InterfaceTask, InterfaceIDTask {}

// Enable fetchMock
fetchMock.enableMocks();

describe('API Functions', () => {
  beforeEach(() => {
    fetchMock.resetMocks(); // Reset mocks before each test to ensure clean state
  });

  test('getAllTasks should return tasks', async () => {
    const mockTasks: InterfaceTaskWithID[] = [
      { ID: 1, name: 'Task 1', description: 'Description 1', date: '2024-08-01', priority: 'High', status: 'Pending' },
      { ID: 2, name: 'Task 2', description: 'Description 2', date: '2024-08-02', priority: 'Medium', status: 'Completed' },
    ];

    // Mock the fetch response for the API call
    fetchMock.mockResponseOnce(JSON.stringify(mockTasks));

    // Call the function to test
    const tasks = await getAllTasks();

    expect(tasks).toEqual(mockTasks);
    // Verify that fetch was called with the correct URL and options
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/todolist', { cache: 'no-store' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test('addTask should add a new task', async () => {
    const newTask: InterfaceTask = { 
      name: 'New Task', 
      description: 'New Task Description', 
      date: '2024-08-03', 
      priority: 'Low', 
      status: 'Pending' 
    };
    const mockResponse = { ...newTask, ID: 3 }; // Mock response includes an ID for the new task

    // Mock the fetch response for the API call
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const task = await addTask(newTask);

    expect(task).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/todolist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test('editTask should update an existing task', async () => {
    const updatedTask: InterfaceTaskWithID = { ID: 1, name: 'Updated Task', description: 'Updated Description', date: '2024-08-04', priority: 'High', status: 'In Progress' };

    fetchMock.mockResponseOnce(JSON.stringify(updatedTask));

    const task = await editTask(updatedTask);

    expect(task).toEqual(updatedTask);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/todolist/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test('deleteTask should delete a task', async () => {
    fetchMock.mockResponseOnce('');

    await deleteTask(1);

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/todolist/1', {
      method: 'DELETE',
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
