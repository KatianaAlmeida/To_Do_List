import { InterfaceTask , InterfaceIDTask} from '../../types/tasks'
import Task from './Task';
export interface InterfaceTaskWithID extends InterfaceTask, InterfaceIDTask {}

// Defining the props that the DisplayList component expects
interface DisplayListProps {
  tasks: InterfaceTaskWithID[]; // An array of tasks, each with ID and other task details
}

// Functional component that implements the DisplayListProps interface
const DisplayList: React.FC<DisplayListProps> = ({ tasks }) => {

  return (
    <div className='my-5 flex flex-col gap-4'>
       {/* Looping through the tasks array and rendering a Task component for each task */}

      {tasks.map((task) => (
        <Task  key={task.ID}  task={task}/> // Passing each task to the Task component
      ))}
    </div>
  )
}

export default DisplayList