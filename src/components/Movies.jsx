function RenderMovies ({ movies }) {
  return (
    <ul className='grid-movies'>
      {movies.map((movie) => (
        <li className='movie-item' key={movie.idMovie}>
          <h6 className='title'>{movie.title}</h6>
          <img src={movie.image} alt={movie.title} />
          <h6>{movie.year}</h6>
        </li>
      ))}
    </ul>
  )
}

function RenderNoResult ({ error }) {
  return (
    !error ? <p>No movies found</p> : <p />
  )
}

export function Movies ({ movies, error }) {
  const hasMovie = movies.length > 0
  return (
    hasMovie
      ? <RenderMovies movies={movies} />
      : <RenderNoResult error={error} />

  )
}
