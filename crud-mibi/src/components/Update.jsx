import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function Update() {
  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => setTask(res.data))
      .catch(err => console.log(err))
  }, [])


  function handleSubmit(event) {
    event.preventDefault()
    axios.put(`http://localhost:8081/update/${id}`, { task, description })
      .then(res => {
        console.log(res)
        navigate('/')
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Editar Tarea</h2>
          <div className="mb-2">
            <label htmlFor="task" className="form-label">Tarea</label>
            <input type="text" className="form-control" id="task" placeholder="Nombra tu tarea"  onChange={e => setTask(e.target.value)} />
          </div>
          <div className="mb-2">
            <label htmlFor="description">Descripción</label>
            <textarea className="form-control" id="description" rows="3" placeholder="Describe tu tarea a realizar" onChange={e => {
              setDescription(e.target.value)
            }}></textarea>
          </div>
          <button type="submit" className="btn btn-success">Actualizar</button>
        </form>
      </div>
    </div>
  )
}