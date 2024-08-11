import { InterfaceTask } from '@/types/tasks'
import React from 'react'

// no idea but i think is getting the data from the page.tsx
interface DisplayListProps {
  tasks: InterfaceTask[]
}

// no idea but I think its implementing the DisplayListProps interface
const DisplayList: React.FC<DisplayListProps> = ({ tasks }) => {
  return (
    <div className='text-center my-5 flex flex-col gap-4'>
       {/* its like the outside of a loop */}
      {tasks.map(task => (
        // this is getting looped
        <div key={task.name} className="collapse bg-base-100" >
          <input type="checkbox" />
          <div className="collapse-title static">
            <div className="stat-title">{task.status}</div>
            <div className="stat-value">{task.name}</div>
            <div className="stat-desc">{task.priority}</div>
          </div>
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