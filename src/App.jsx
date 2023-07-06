import './App.css'
import './Bolt.css'
import React, { useState, useCallback } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

const App = () => {
  const [sort, setSort] = useState(false)
  const { error, setQuery, setError, query } = useSearch()
  const { movies, getMovies, loading } = useMovies({ query, error, sort })
  const debounceGetMovies = useCallback(debounce((newQuery, error) => getMovies({ query: newQuery, error }), 300), [])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ query, error })
  }

  const handleChange = (event) => {
    const newQuery = event.target.value
    let newError = null

    if (newQuery.startsWith(' ')) return

    setQuery(newQuery)
    if (newQuery === '') {
      newError = 'form is empty'
      setError(newError)
      return
    }
    if (newQuery.length < 4) {
      newError = 'form must have more than tree characters'
      setError(newError)
      return
    }
    newError = null
    setError(null)
    debounceGetMovies(newQuery, newError)
  }

  const handleSort = () => {
    !sort ? setSort(true) : setSort(false)
  }

  return (
    <div className='container'>
      <header>
        <h3 className='title'>Search for movies</h3>
        <form onSubmit={handleSubmit}>

          <input
            onChange={handleChange}
            value={query}
            className='search-input' placeholder='lord of the rigns,rambo'
            type='text'
          />
          <input onChange={handleSort} type='checkbox' checked={sort} />

          <button type='submit'>Buscar</button>

        </form>
        {error && <div><p style={{ color: 'red' }}>{error}</p></div>}
      </header>
      <main> {loading ? <div><p>cargando</p></div> : <Movies movies={movies} error={error} />}</main>
    </div>
  )
}

export default App
