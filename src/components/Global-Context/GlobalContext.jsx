// hooks import
import React, { createContext, useState } from 'react'

export const IndexContext = createContext(null);

export default function GlobalContext({ children }) {
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);

  const getFocusedMovieIndex = (focusedMovieIndex) => {
    setSelectedMovieIndex(focusedMovieIndex);
  }

  return (
    <>
      <IndexContext.Provider value={{ selectedMovieIndex, getFocusedMovieIndex }}>
        {children}
      </IndexContext.Provider>
    </>
  )
}
