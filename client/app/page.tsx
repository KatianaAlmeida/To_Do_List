import { getAllTasks } from "../api"; // Importing the function to fetch tasks from the API
import DisplayList from "./components/DisplayList"; // Importing a component to display the task list
import ButtonAddTask from "./components/ButtonAddTask";


export default async function Home() {
  // Fetch the task list asynchronously from the API ???
  const taskList = await getAllTasks();
  //console.log(taskList);
  
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="mockup-window bg-base-300 border">
        <div className="bg-base-200 flex justify-center px-4 py-16">
          <main className="w-full">
            <div className="text-center flex flex-col gap-4">
              <h1 className="text-2xl font-bold">Todo List App</h1>
              {/* Displaying the list of tasks */}
              <DisplayList tasks={taskList}/>
              
              {/* Button to add a new task */}
              <ButtonAddTask />
              
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
