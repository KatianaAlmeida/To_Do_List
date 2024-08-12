const request = require('supertest');
const app = require('./server');

describe('POST /api/todolist', () => {
  it('should create a new task', async () => {
    const newTask = {
      name: 'Test Task',
      description: 'This is a test task.',
      date: '2024-08-12',
      priority: 'High',
      status: 'Pending'
    };
    const response = await request(app).post('/api/todolist').send(newTask);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(`Task with the name: ${newTask.name} has been added.`);
  });
});

describe('GET /api/todolist', () => {
  it('should fetch all tasks', async () => {
    const response = await request(app).get('/api/todolist');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('PUT /api/todolist/:id', () => {
  it('should update an existing task', async () => {
    const taskId = 22; // Assuming a task with ID 1 exists
    const updatedTask = {
      name: 'Updated Task',
      description: 'This is an updated test task.',
      date: '2024-08-13',
      priority: 'Medium',
      status: 'Completed',
    };
    const response = await request(app).put(`/api/todolist/${taskId}`).send(updatedTask);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(`Task with the name: ${updatedTask.name} has been updated.`);
  });
});

describe('DELETE /api/todolist/:id', () => {
  it('should delete an existing task', async () => {
    const taskId = 23; // Assuming a task with ID 1 exists
    const response = await request(app).delete(`/api/todolist/${taskId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(`Task with the id: ${taskId} has been deleted.`);
  });
});