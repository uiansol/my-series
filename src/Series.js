import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Series = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get('/api/series')
      .then(res => {
        setData(res.data.data)
      })
  }, [])

  const deleteSerie = (id) => {
    axios
      .delete('/api/series/' + id)
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
          <button className='btn btn-danger' onClick={() => deleteSerie(record.id)}>Remove</button>
          <Link className='btn btn-warning' to={'/series/' + record.id}>Info</Link>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Series</h1>
        <div><Link className='btn btn-primary' to='/series/new'>New serie</Link></div>
        <div className='alert alert-warning' role='alert'>
          You don't have series created.
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>Series</h1>
      <div><Link className='btn btn-primary' to='/series/new'>New serie</Link></div>
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

export default Series
