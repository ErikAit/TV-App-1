import React, { useState } from 'react'

export default function GlobalContext({ children }) {
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);

  return (
    <>
      {children}
    </>
  )
}
