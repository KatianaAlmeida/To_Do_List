import { InterfaceTask } from "./types/tasks";

const baseUrl = 'http://localhost:5000';

// no idea but I think this is somehow fetching the data from the api
export const getAllTasks = async (): Promise<InterfaceTask[]> => {
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