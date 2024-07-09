import React from 'react'

// css import
import './Card-css/Card.css'

export default function Card({ data, selectedMovieIndex, onClick }) {
  return (
    <div className={`Card ${selectedMovieIndex ? 'selectedMovie' : ''}`} onClick={onClick}>
      <img src={data.stream_icon} alt="movie poster" />
      <p>{data.name}</p>
    </div>
  )
}
