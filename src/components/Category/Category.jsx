import React, { memo, useContext } from 'react';

// components imports
import Card from '../Card/Card';
import { AllMoviesContext, IndexContext } from '../Global-Context/GlobalContext';

// css import
import './Category-css/Category.css';

function Category() {
  const { selectedMovieIndex, getFocusedMovieIndex } = useContext(IndexContext);
  const { categories, movies } = useContext(AllMoviesContext);

  return (
    <div className='category__container'>
      {categories.slice(0, 30).map((category, categoryIndex) => (
        <div key={category.category_id}>
          <h2>{category.category_name}</h2>
          <div className="category__content">
            {movies.map((movie, index) => {
              if (movie.category_id === category.category_id) {
                return (
                  <Card
                    key={movie.stream_id}
                    data={movie}
                    selectedMovieIndex={selectedMovieIndex === index}
                    onClick={() => getFocusedMovieIndex(index)}
                    index={index}
                  />
                );
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(Category);
