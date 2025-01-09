import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import Mibi  from "./Mibi"

export default function Home() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => setTasks(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/${id}`)
      setTasks(tasks.filter(task => task.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="d-flex p-1 justify-content-center align-items-center">
      <Mibi />
      </div>

      <div className="d-flex w-100 p-3 h-75 bg-primary justify-content-center align-items-center rounded-5">
        <div className="w-56 bg-white rounded p-3">
          <Link to="/create" className="btn btn-success">Añadir tarea</Link>
          <table className="table">
            <thead>
              <tr>
                <th>Tarea</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                tasks.map(task => (
                  <tr key={task.id}>
                    
                    <td>{task.task}</td>
                    <td>{task.description}</td>
                    <td>
 
                      <Link to={`update/${task.id}`} className="btn btn-primary">Editar</Link>
                      <button className="btn btn-danger ms-2" onClick={() =>{
                        return handleDelete(task.id)
                      }}>Borrar</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}