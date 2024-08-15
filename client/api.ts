import { InterfaceTask, InterfaceIDTask } from "./types/tasks";
// Interface extending both InterfaceTask and InterfaceIDTask to represent a task with an ID
export interface InterfaceTaskWithID extends InterfaceTask, InterfaceIDTask {}

//const baseUrl = 'http://localhost:5000'; // Base URL for the API              LOCALHOST
const baseUrl = 'https://to-do-list-0tc3.onrender.com';  // RENDER

// Function to fetch all tasks from the API
export const getAllTasks = async (): Promise<InterfaceTaskWithID[]> => {
  const result = await fetch(`${baseUrl}/api/todolist`, {cache: 'no-store'}); // Fetches tasks, avoiding caching (not to store any cached copies, the client must fetch the resource from the server each time it’s needed)
  const list = await result.json(); // Parses the JSON response (converting a JSON string into a JavaScript object)
  return list; // Returns the list of tasks
}

// Function to add a new task to the API
export const addTask = async (task:InterfaceTask): Promise<InterfaceTask> =>{
  const result = await fetch(`${baseUrl}/api/todolist`, {
    method: 'POST', // Specifies the POST method to add a task
    headers: {
      'Content-Type': 'application/json' // Sets the request header to JSON
    },
    body: JSON.stringify(task) // Converts the task object to JSON
  })
  const newTask = await result.json();
  return newTask;
}

// Function to update an existing task on the API
export const editTask = async (task:InterfaceTaskWithID): Promise<InterfaceTaskWithID> =>{
  const result = await fetch(`${baseUrl}/api/todolist/${task.ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  const updatedTask = await result.json();
  return updatedTask;
}

// Function to delete a task from the API by its ID
export const deleteTask = async (ID:number): Promise<void> =>{
  await fetch(`${baseUrl}/api/todolist/${ID}`, {
    method: 'DELETE'
  })
}