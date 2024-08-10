import { InterfaceTask } from '@/types/tasks'
import React from 'react'

// no idea but i think is getting the data from the page.tsx
interface DisplayListProps {
  tasks: InterfaceTask[]
}

// no idea
const DisplayList: React.FC<DisplayListProps> = ({ tasks }) => {
  return (
    <div className='text-center my-5 flex flex-col gap-4'>
      {tasks.map(task => (

      <div key={task.ID} className="collapse bg-base-100" >
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title">{task.name}</div>
        <div className="collapse-content">
          <p>{task.description}</p>
          <span>{task.priority}</span>
        </div>
      </div>

      ))}
    </div>
  )
}

export default DisplayList