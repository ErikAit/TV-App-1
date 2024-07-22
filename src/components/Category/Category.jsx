import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './Category-css/Category.css';
import { useCategoryStore, useMovieStore } from '../../requests/requests';

function Category() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [focusedCategoryIndex, setFocusedCategoryIndex] = useState(0);

  const { categories, fetchCategories } = useCategoryStore();
  const { movies, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchCategories();
    fetchMovies();
  }, [fetchCategories, fetchMovies]);

  const getMoviesByCategory = (categoryId) => {
    return movies.filter(movie => movie.category_id === categoryId);
  };

  const handleKeyDown = (e) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      const focusedCategory = categories[focusedCategoryIndex];
      const focusedCategoryMovies = getMoviesByCategory(focusedCategory.category_id);

      if (e.key === 'ArrowLeft') {
        setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0));
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex(prevIndex => Math.min(prevIndex + 1, focusedCategoryMovies.length - 1));
      } else if (e.key === 'ArrowUp') {
        if (focusedCategoryIndex > 0) {
          const newCategoryIndex = focusedCategoryIndex - 1;
          const newCategoryMovies = getMoviesByCategory(categories[newCategoryIndex].category_id);
          setFocusedCategoryIndex(newCategoryIndex);
          setSelectedIndex(Math.min(selectedIndex, newCategoryMovies.length - 1));
        }
      } else if (e.key === 'ArrowDown') {
        if (focusedCategoryIndex < categories.length - 1) {
          const newCategoryIndex = focusedCategoryIndex + 1;
          const newCategoryMovies = getMoviesByCategory(categories[newCategoryIndex].category_id);
          setFocusedCategoryIndex(newCategoryIndex);
          setSelectedIndex(Math.min(selectedIndex, newCategoryMovies.length - 1));
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedCategoryIndex, selectedIndex, categories, movies]);

  return (
    <div className='category__container'>
      {categories.slice(0, 2).map((category, categoryIndex) => (
        <div key={category.category_id}>
          <h2>{category.category_name}</h2>
          <div className="category__content">
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
