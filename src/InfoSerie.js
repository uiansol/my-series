import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge} from 'reactstrap'

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({})
  const [success, setSuccess] = useState(false)
  const [mode, setMode] = useState('INFO')
  const [genres, setGenres] = useState([])
  const [genreId, setGenreId] = useState('')

  const [data, setData] = useState({})
  useEffect(() => {
    axios
      .get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data)
        setForm(res.data)
      })
  }, [match.params.id])

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setGenres(res.data.data)
        const genres = res.data.data
        const found = genres.find(value => data.genre === value.name)

        if (found) {
          setGenreId(found.id)
        }
      })
  }, [data])

  // custom header
  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    })
  }

  const onChangeGenre = evt => {
    setGenreId(evt.target.value)
  }

  const select = value => () => {
    console.log(value)
    setForm({
      ...form,
      status: value
    })
  }

  const save = () => {
    axios
      .put('/api/series/' + match.params.id, {
        ...form,
        genre_id: genreId
      })
      .then(res => {
        setSuccess(true)
      })
  }

  if (success) {
    return <Redirect to='/series' />
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
              </div>
              <div className='col-8'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                  {data.status === 'WATCHED' && <Badge color='success' className='btn-action'>Watched</Badge>}
                  {data.status === 'TO_WATCH' && <Badge color='warning' className='btn-action'>To Watch</Badge>}
                  Genre: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className='container'>
        {mode === 'INFO' && <button className='btn btn-primary btn-edit' onClick={() => setMode('EDIT')}>Editar</button>}
      </div>

      {
        mode === 'EDIT' &&
          <div className='container'>
            <h1>Edit serie</h1>
            <button className='btn btn-primary btn-new' onClick={() => setMode('INFO')}>Cancel edit</button>
            <form>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name ' placeholder='Serie name' />
              </div>

              <div className='form-group'>
                <label htmlFor='name'>Comments</label>
                <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='comments' placeholder='Comments' />
              </div>

              <div className='form-group'>
                <label htmlFor='name'>Genre</label>
                <select className='form-control' onChange={onChangeGenre} value={genreId}>
                  {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                </select>
              </div>
              <div className='form-check'>
                <input className='form-check-input' type='radio' name='status' id='watched' value='WATCHED' checked={form.status === 'WATCHED'} onChange={select('WATCHED')} />
                <label className='form-check-label' htmlFor='watched'>
                  Watched
                </label>
              </div>
              <div className='form-check'>
                <input className='form-check-input' type='radio' name='status' id='toWatch' value='TO_WATCH' checked={form.status === 'TO_WATCH'} onChange={select('TO_WATCH')} />
                <label className='form-check-label' htmlFor='toWatch'>
                  To Watch
                </label>
              </div>
              <button type='button' onClick={save} className='btn btn-primary btn-edit'>Save</button>
            </form>
          </div>
      }
    </div>
  )
}

export default InfoSerie
