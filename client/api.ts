import { InterfaceTask } from "./types/tasks";

const baseUrl = 'http://localhost:5000';

// no idea what is this but somehow is fetching the data from the api
export const getAllTasks = async (): Promise<InterfaceTask[]> => {
  const result = await fetch(`${baseUrl}/api/todolist`);
  const list = await result.json();
  return list;
}