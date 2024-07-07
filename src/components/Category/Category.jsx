import React from 'react'

// coponents imports
import Card from '../Card/Card'

// css import
import './Category-css/Category.css'

export default function Category({ movieData, categoryData }) {
  return (
    <div className='category__container'>
      {
        categoryData.map((category) => {
          return (
            <div key={category.category_id}>
              <h2>{category.category_name}</h2>
              <div className="category__content">
                {
                  movieData.map((movie) => {
                    if (movie.category_id === category.category_id) {
                      return <Card key={movie.stream_id} data={movie} />
                    }
                  })
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
