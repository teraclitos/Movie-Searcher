import { useRef, useState, useMemo, useCallback, useEffect } from 'react'

import { fetchMovies } from '../services/fetchMovies'

export const useMovies = ({ query, error, sort }) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const firstMovieSearchCheck = useRef(query)

  const getMovies = useCallback(
    async ({ query, error }) => {
      if (error || query === '') return
      if (query === firstMovieSearchCheck.current) return
      setLoading(null)
      try {
        setLoading(true)
        const newMovies = await fetchMovies({ query, error })

        setMovies(newMovies)
      } catch (e) {
        console.log(e.message)
        setMovies([])
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
      firstMovieSearchCheck.current = query
    }
    , [])
  useEffect(() => {
    console.log('get movies render')
  }, [getMovies])
  const sortedMovies = useMemo(() => {
    return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
  },
  [movies, sort]
  )

  return { movies: sortedMovies, getMovies, loading }
}
