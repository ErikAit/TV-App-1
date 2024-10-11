import React, { useEffect, useRef, useState } from 'react';
import Card from '../Card/Card';
import './Category-css/Category.css';
import { useCategoryStore, useMovieStore, useFocusStore } from '../../requests/requests';
import { useNavigate } from 'react-router-dom';

function Category() {
  const { categories, fetchCategories } = useCategoryStore();
  const { movies, fetchMovies } = useMovieStore();
  const { selectedIndex, focusedCategoryIndex, handleKeyDown, sliceStart, sliceEnd } = useFocusStore();

  const listRef = useRef(null);

  useEffect(() => {
    fetchCategories();
    fetchMovies();
  }, [fetchCategories, fetchMovies]);

  useEffect(() => {
    if (listRef.current) {
      const selectedCard = listRef.current.querySelector('.scroll');
      if (selectedCard) {
        // setTimeout(() => {
        selectedCard.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'end',
        });
        // }, 8)
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
    return movies.filter(movie => movie.category_id === categoryId).slice(sliceStart, sliceEnd);
  };

  const navigate = useNavigate();
  console.log(selectedIndex);

  return (
    <div className='category__container'>
      {categories.slice(0, 4).map((category, categoryIndex) => (
        <div key={category.category_id}>
          <h2>{category.category_name} <i className='bx bx-chevron-right'></i></h2>
          <div className="category__content" ref={categoryIndex === focusedCategoryIndex ? listRef : null}>
            {getMoviesByCategory(category.category_id).map((movie, movieIndex) => {
              return <div key={movie.stream_id}>
                <Card
                  data={movie}
                  selectedMovieIndex={focusedCategoryIndex === categoryIndex && selectedIndex === movieIndex}
                  index={selectedIndex}
                  categoryIndex={categoryIndex}
                />
              </div>
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default React.memo(Category);
