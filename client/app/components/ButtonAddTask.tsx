"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "./Modal";
import { addTask } from "@/api";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEventHandler, useState } from "react";

const ButtonAddTask = () => {
  // modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  
  // adding router to refresh the page
  const router = useRouter();

  // Initializing state for the html elements
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskDescr, setNewTaskDescr] = useState<string>('');
  const [newTaskPrior, setNewTaskTPrior] = useState<string>('');
  const [newTaskDate, setNewTaskDate] = useState<string>('');
  const [newTaskStatus, setNewTaskStatus] = useState<string>('');

  // I think is a function prevent the form from submiting ad default and sends the data
  const handleSubmitNewTask: FormEventHandler<HTMLFormElement> = async (e) =>{
    e.preventDefault();
    //console.log(newTaskStatus);
    await addTask({
      name: newTaskTitle,
      description: newTaskDescr,
      date: newTaskDate,
      priority: newTaskPrior,
      status:newTaskStatus
    })
    setNewTaskTitle(""); // make the field empty
    setNewTaskDescr("");
    setNewTaskTPrior("");
    setNewTaskDate("");
    setNewTaskStatus("");
    setModalOpen(false);
    router.refresh();
  };

  // Handle change event
  const handleNewTaskTitle = async (e: ChangeEvent<HTMLInputElement>) =>{
    setNewTaskTitle(e.target.value);
  };
  const handleNewTaskDescr = async (e: ChangeEvent<HTMLTextAreaElement>) =>{
    setNewTaskDescr(e.target.value);
  };
  const handleNewTaskPrior = async (e: ChangeEvent<HTMLInputElement>) =>{
    setNewTaskTPrior(e.target.value);
  };
  const handleNewTaskDate = async (e: ChangeEvent<HTMLInputElement>) =>{
    setNewTaskDate(e.target.value);
  };
  const handleNewTaskStatus = async (e: ChangeEvent<HTMLInputElement>) =>{
    setNewTaskStatus(e.target.value);
  };
  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-neutral w-full">
        Add New Task <AiOutlinePlus className="ml-2" size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTask}>
          <h3 className="font-bold text-lg">Create New Task</h3>
          <div className="modal-action flex-col gap-y-3">
            {/* No idea what is this*/}
            <input 
              value={newTaskTitle} 
              onChange={handleNewTaskTitle}
              type="text" 
              placeholder="Task Title" 
              className="input input-bordered w-full" 
            />

            <textarea 
              value={newTaskDescr} 
              onChange={handleNewTaskDescr}
              className="textarea textarea-bordered w-full" 
              placeholder="Task Description"
            />

            {/* This is the priority radio buttons */}
            <div className="flex gap-x-3 w-full">
              <label className="btn btn-outline">
                <input 
                  type="radio" 
                  name="priority" 
                  value='High'
                  onChange={handleNewTaskPrior}
                  className="hidden peer" 
                />
                <span className="peer-checked:bg-neutral peer-checked:text-white">High</span>
              </label>
              <label className="btn btn-outline">
                <input 
                  type="radio" 
                  name="priority" 
                  value='Medium'
                  onChange={handleNewTaskPrior}
                  className="hidden peer"
                />
                <span className="peer-checked:bg-neutral peer-checked:text-white">Medium</span>
              </label>
              <label className="btn btn-outline">
                <input 
                  type="radio" 
                  name="priority" 
                  value='Low'
                  onChange={handleNewTaskPrior}
                  className="hidden peer" 
                />
                <span className="peer-checked:bg-neutral peer-checked:text-white">Low</span>
              </label>
            </div>

            {/* This is to select the due date for the task */}
            <input 
              value={newTaskDate} 
              onChange={handleNewTaskDate}
              type="date" 
              className="input input-bordered w-full" 
            />

            {/* This is the progress radio buttons */}
            <div className="flex gap-x-3 w-full">
              <label className="btn btn-outline">
                <input 
                  type="radio" 
                  name="progress" 
                  value='Completed'
                  onChange={handleNewTaskStatus}
                  className="hidden peer"
                />
                <span className="peer-checked:bg-neutral peer-checked:text-white">Completed</span>
              </label>
              <label className="btn btn-outline">
                <input 
                  type="radio" 
                  name="progress" 
                  value='In Progress'
                  onChange={handleNewTaskStatus}
                  className="hidden peer" 
                />
                <span className="peer-checked:bg-neutral peer-checked:text-white">In-Progress</span>
              </label>
              <label className="btn btn-outline">
                <input 
                  type="radio" 
                  name="progress" 
                  value='To Do'
                  onChange={handleNewTaskStatus}
                  className="hidden peer" 
                />
                <span className="peer-checked:bg-neutral peer-checked:text-white">To Do</span>
              </label>
            </div>
            <button type="submit" className="btn btn-neutral">Create</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ButtonAddTask