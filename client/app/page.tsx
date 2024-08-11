import { getAllTasks } from "@/api";
import DisplayList from "./components/DisplayList";
import ButtonAddTask from "./components/ButtonAddTask";

// no idea of what async is
export default async function Home() {
  // I think we are getting the data from the imported api.ts
  const taskList = await getAllTasks();
  //console.log(taskList);
  
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="mockup-window bg-base-300 border">
        <div className="bg-base-200 flex justify-center px-4 py-16">
          <main className="m-5">
            <div className="text-center my-5 flex flex-col gap-4">
              <h1 className="text-2xl font-bold">Todo List App</h1>
              
              <DisplayList tasks={taskList}/>

              <ButtonAddTask />
              
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
