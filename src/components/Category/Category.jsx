import React from 'react'

// coponents imports
import Card from '../Card/Card'

// css import
import './Category-css/Category.css'

export default function Category({ movieData, categoryData }) {
  return (
    <div className='category__container'>
      <div className="category__content">
        {
          movieData.map((movie) => {
            return <Card key={movie.stream_id} data={movie} />
          })
        }
      </div>
    </div>
  )
}
