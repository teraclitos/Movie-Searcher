export const fetchMovies = async ({ query }) => {
  const API_KEY = '3487ae41'

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
    const json = await response.json()
    const movies = json.Search

    return movies.map((movie) =>
      (
        {
          idMovie: movie.imdbID,
          title: movie.Title,
          image: movie.Poster,
          year: movie.Year
        }
      )
    )
  } catch (error) {
    throw new Error('No movies found')
  }
}
