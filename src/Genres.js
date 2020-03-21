import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './app.css'

const Genres = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setData(res.data.data)
      })
  }, [])

  const deleteGenre = (id) => {
    axios
      .delete('/api/genres/' + id)
      .then(res => {
        const filtered = data.filter(item => item.id !== id)
        setData(filtered)
      })
  }

  const renderLine = (record) => {
    return (
      <tr key={record.id}>
        <th scope='row'>{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button className='btn btn-danger btn-action' onClick={() => deleteGenre(record.id)}>Remove</button>
          <Link className='btn btn-warning' to={'/genres/' + record.id}>Edit</Link>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Genres</h1>
        <div><Link className='btn btn-primary' to='/genres/new'>New genre</Link></div>
        <div className='alert alert-warning' role='alert'>
          You don't have genres created.
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>Genres</h1>
      <div><Link className='btn btn-primary btn-new' to='/genres/new'>New genre</Link></div>
      <table className='table table-dark'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Nome</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderLine)}
        </tbody>
      </table>
    </div>
  )
}

export default Genres
