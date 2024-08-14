import { InterfaceTask , InterfaceIDTask} from '../../types/tasks'
import Task from './Task';
export interface InterfaceTaskWithID extends InterfaceTask, InterfaceIDTask {}

// no idea but i think is getting the data from the page.tsx
interface DisplayListProps {
  tasks: InterfaceTaskWithID[];
}

// no idea but I think its implementing the DisplayListProps interface
const DisplayList: React.FC<DisplayListProps> = ({ tasks }) => {

  return (
    <div className='my-5 flex flex-col gap-4'>
      {/* its like the outside of a loop */}

      {tasks.map((task) => (
        <Task  key={task.ID}  task={task}/>
      ))}
    </div>
  )
}

export default DisplayList