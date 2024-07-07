import React from 'react'

export default function Card({ data }) {
  return (
    <div className='Card'>
      <img src={data.stream_icon} alt="movie poster" />
    </div>
  )
}
