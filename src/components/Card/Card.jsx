import React from 'react'

// css import
import './Card-css/Card.css'

export default function Card({ data }) {
  return (
    <div className='Card'>
      <img src={data.stream_icon} alt="movie poster" />
    </div>
  )
}
