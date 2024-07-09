// hooks import
import React, { createContext, useEffect, useState } from 'react'

export const IndexContext = createContext(null);

export default function GlobalContext({ children }) {
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);

  const getFocusedMovieIndex = (focusedMovieIndex) => {
    setSelectedMovieIndex(focusedMovieIndex);
  }

  useEffect(() => {
    const selectMovie = (e) => {
      if (e.code === 'ArrowRight') {
        setSelectedMovieIndex(Math.min(selectedMovieIndex + 1, 2000));
      } else if (e.code === 'ArrowLeft') {
        setSelectedMovieIndex(Math.min(selectedMovieIndex - 1, 2000));
      }
    }

    document.addEventListener('keydown', selectMovie);

    return () => {
      document.addEventListener('keydown', selectMovie)
    }
  }, [selectedMovieIndex])

  return (
    <>
      <IndexContext.Provider value={{ selectedMovieIndex, getFocusedMovieIndex }}>
        {children}
      </IndexContext.Provider>
    </>
  )
}
