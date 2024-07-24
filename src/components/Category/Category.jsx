import React, { useEffect, useRef } from 'react';
import Card from '../Card/Card';
import './Category-css/Category.css';
import { useCategoryStore, useMovieStore, useFocusStore } from '../../requests/requests';

function Category() {
  const { categories, fetchCategories } = useCategoryStore();
  const { movies, fetchMovies } = useMovieStore();
  const { selectedIndex, focusedCategoryIndex, handleKeyDown } = useFocusStore();

  const listRef = useRef(null);

  useEffect(() => {
    fetchCategories();
    fetchMovies();
  }, [fetchCategories, fetchMovies]);

  useEffect(() => {
    if (listRef.current) {
      const selectedCard = listRef.current.querySelector('.selected');
      if (selectedCard) {
        selectedCard.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'end',
        });
      }
    }
  }, [selectedIndex, focusedCategoryIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const getMoviesByCategory = (categoryId) => {
    return movies.filter(movie => movie.category_id === categoryId);
  };

  return (
    <div className='category__container'>
      {categories.slice(0, 4).map((category, categoryIndex) => (
        <div key={category.category_id}>
          <h2>{category.category_name}</h2>
          <div className="category__content" ref={categoryIndex === focusedCategoryIndex ? listRef : null}>
            {getMoviesByCategory(category.category_id).map((movie, movieIndex) => (
              <Card
                key={movie.stream_id}
                data={movie}
                selectedMovieIndex={focusedCategoryIndex === categoryIndex && selectedIndex === movieIndex}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default React.memo(Category);
