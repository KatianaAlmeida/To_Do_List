"use client";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AddTask } from "./AddTask";

const ButtonAddTask = () => {
  // modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-neutral w-full">
        Add New Task <AiOutlinePlus className="ml-2" size={18} />
      </button>

      <AddTask modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </div>
  )
}

export default ButtonAddTask