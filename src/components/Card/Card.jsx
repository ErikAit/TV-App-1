import React from 'react'

// css import
import './Card-css/Card.css'

export default function Card({ data, selectedMovieIndex, onClick }) {
  return (
    <div className='Card' onClick={onClick}>
      {
        selectedMovieIndex &&
        <div className="border selectedMovie"></div>
      }
      <img src={data.stream_icon} alt="movie poster" />
      <p>{data.name}</p>
    </div>
  )
}
