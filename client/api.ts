import { InterfaceTask, InterfaceIDTask } from "./types/tasks";
export interface InterfaceTaskWithID extends InterfaceTask, InterfaceIDTask {}

const baseUrl = 'http://localhost:5000';

// no idea but I think this is somehow fetching the data from the api
export const getAllTasks = async (): Promise<InterfaceTaskWithID[]> => {
  const result = await fetch(`${baseUrl}/api/todolist`, {cache: 'no-store'});
  const list = await result.json();
  return list;
}

export const addTask = async (task:InterfaceTask): Promise<InterfaceTask> =>{
  const result = await fetch(`${baseUrl}/api/todolist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  const newTask = await result.json();
  return newTask;
}

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

export const deleteTask = async (ID:number): Promise<void> =>{
  await fetch(`${baseUrl}/api/todolist/${ID}`, {
    method: 'DELETE'
  })
}