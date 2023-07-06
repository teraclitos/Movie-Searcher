import { useState } from 'react'

export const useSearch = () => {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  return { error, setQuery, setError, query }
}
