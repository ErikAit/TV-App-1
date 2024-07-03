import React from 'react'

export default function Category({ movieData, categoryData }) {
  return (
    <div className='category__container'>
      {
        categoryData.map((category) => {
          return <h2 key={category.category_id}>{category.category_name}</h2>
        })
      }
      <div className="category__content">
        {
          movieData.map((movie) => {
            return <div></div>
          })
        }
      </div>
    </div>
  )
}
