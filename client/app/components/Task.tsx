"use client";
import { FormEventHandler, useState } from "react";
import { InterfaceTask, InterfaceIDTask } from '@/types/tasks'
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { Modal } from './Modal';
import { editTask, deleteTask } from "@/api";
import { useRouter } from "next/navigation";
export interface InterfaceTaskWithID extends InterfaceTask, InterfaceIDTask {}

interface DisplayListProps {
  task: InterfaceTaskWithID;
}

const Task: React.FC<DisplayListProps> = ({ task }) => {
  const router = useRouter();
  // modal
  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
  const [editTaskTitle, setEditTaskTitle] = useState<string>(task.name);
  const [editTaskDescr, setEditTaskDescr] = useState<string>(task.description);
  const [editTaskPrior, setEditTaskTPrior] = useState<string>(task.priority);
  const formattedDate = new Date(task.date).toISOString().split('T')[0];
  const [editTaskDate, setEditTaskDate] = useState<string>(formattedDate); 
  const [editTaskStatus, setEditTaskStatus] = useState<string>(task.status);

  const handleEditTask: FormEventHandler<HTMLFormElement> = async (e) =>{
    e.preventDefault();
    //console.log(newTaskStatus);
    await editTask({
      ID: task.ID,
      name: editTaskTitle,
      description: editTaskDescr,
      date: editTaskDate,
      priority: editTaskPrior,
      status:editTaskStatus
    })
    setModalOpenEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (ID:number) =>{
    await deleteTask(ID);
    setModalOpenDelete(false);
    router.refresh();
  };

  return (
    <div key={task.name} className=" bg-base-100" >
          
          <div className="collapse-title static flex flex-row gap-x-9">
            <div className='w-full text-left'>
              <div className="stat-value">{task.name}</div>
              <div className="stat-desc">{task.priority}</div>
            </div>
            <div className="flex flex-row gap-x-4">
              <FaEdit onClick={() => setModalOpenEdit(true)} cursor={"pointer"} size={25} />
              <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
                <form onSubmit={handleEditTask}>
                  <h3 className="font-bold text-lg">Edit Task</h3>
                  <div className="modal-action flex-col gap-y-3">
                    {/* No idea what is this*/}
                    <input 
                      value={editTaskTitle} 
                      onChange={(e) => setEditTaskTitle(e.target.value)}
                      type="text" 
                      placeholder="Task Title" 
                      className="input input-bordered w-full" 
                    />

                    <textarea 
                      value={editTaskDescr} 
                      onChange={(e) => setEditTaskDescr(e.target.value)}
                      className="textarea textarea-bordered w-full" 
                      placeholder="Task Description"
                    />

                    {/* This is the priority radio buttons */}
                    <div className="flex gap-x-3 w-full">
                      <select 
                        value={editTaskPrior} 
                        onChange={(e) => setEditTaskTPrior(e.target.value)}
                        className="select select-bordered w-full"
                      >
                        <option value="" disabled hidden>Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    {/* This is to select the due date for the task */}
                    <input 
                      value={editTaskDate} 
                      onChange={(e) => setEditTaskDate(e.target.value)}
                      type="date" 
                      className="input input-bordered w-full" 
                    />

                    {/* This is the progress radio buttons */}
                    <div className="flex gap-x-3 w-full">
                      <select 
                        value={editTaskStatus} 
                        onChange={(e) => setEditTaskStatus(e.target.value)}
                        className="select select-bordered w-full"
                      >
                        <option value="" disabled hidden>Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="To Do">To Do</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-neutral">Update</button>
                  </div>
                </form>
              </Modal>
              <FaTrashAlt onClick={() => setModalOpenDelete(true)} cursor={"pointer"} size={25}/>
              <Modal modalOpen={modalOpenDelete} setModalOpen={setModalOpenDelete}>
                <h3 className="text-neutral">Are  you sure you want to delete this task?</h3>
                <div className="modal-action">
                  <button
                    onClick={() => handleDeleteTask(task.ID)}
                    className="btn">
                      Yes
                  </button>
                </div>
              </Modal>
            </div>
          </div>
          <div className=" text-left ml-4">
            <p><b>Satus: </b>{task.status}</p>
            <p><b>Description: </b>{task.description}</p>
            <span><b>Date: </b> {formattedDate}</span>
          </div>
        </div>
  )
}

export default Task