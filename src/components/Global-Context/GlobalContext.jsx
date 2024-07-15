// hooks import
import React, { createContext, useEffect, useState } from 'react';

export const IndexContext = createContext(null);
export const AllMoviesContext = createContext(null);

export default function GlobalContext({ children }) {
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const categoryResponse = await fetch('https://inter.natv.fm/player_api.php?username=rokuappdev&password=20928292684&action=get_vod_categories');
        const categoryData = await categoryResponse.json();
        setCategories(categoryData);

        const moviesResponse = await fetch('https://inter.natv.fm/player_api.php?username=rokuappdev&password=20928292684&action=get_vod_streams');
        const moviesData = await moviesResponse.json();
        setMovies(moviesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getFocusedMovieIndex = (focusedMovieIndex) => {
    setSelectedMovieIndex(focusedMovieIndex);
  };

  useEffect(() => {
    const selectMovie = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        if (e.code === 'ArrowRight') {
          setSelectedMovieIndex((prevIndex) => Math.min(prevIndex + 1, movies.length - 1));
        } else if (e.code === 'ArrowLeft') {
          setSelectedMovieIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (e.code === 'ArrowUp') {
          setSelectedCategoryIndex((prevIndex) => Math.max(prevIndex - 1, 0));

          const firstMovieInCategory = movies.findIndex(movie => movie.category_id === categories[selectedCategoryIndex - 1]?.category_id);
          if (firstMovieInCategory !== -1) {
            setSelectedMovieIndex(firstMovieInCategory);
          }
        } else if (e.code === 'ArrowDown') {
          setSelectedCategoryIndex((prevIndex) => Math.min(prevIndex + 1, categories.length - 1));

          const firstMovieInCategory = movies.findIndex(movie => movie.category_id === categories[selectedCategoryIndex + 1]?.category_id);
          if (firstMovieInCategory !== -1) {
            setSelectedMovieIndex(firstMovieInCategory);
          }
        }
      }
    };

    document.addEventListener('keydown', selectMovie);

    return () => {
      document.removeEventListener('keydown', selectMovie);
    };
  }, [selectedMovieIndex, selectedCategoryIndex, categories, movies]);

  return (
    <AllMoviesContext.Provider value={{ categories, movies, loading }}>
      <IndexContext.Provider value={{ selectedMovieIndex, getFocusedMovieIndex }}>
        {children}
      </IndexContext.Provider>
    </AllMoviesContext.Provider>
  );
}