import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Index() {

  const [to_do, setTo_do] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:8080/api/todolist")
    .then(res => console.log(res))
    //.then(res => setTo_do(res.data))
    .catch(err => console.log(err));
  }, [])

  return (
    <div>
      <button>Add</button>
      <button>Update</button>
      <button>Delete</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>

          </tr>
        </tbody>
      </table>
    </div>
    
  )
}

export default Index