import React, { createContext, useEffect, useState, useRef } from 'react';

export const IndexContext = createContext(null);
export const AllMoviesContext = createContext(null);
export const MenuContext = createContext(null);

export default function GlobalContext({ children }) {
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);

  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const movieContainerRef = useRef(null);

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

        const categoryMovies = movies.filter(movie => movie.category_id === categories[selectedCategoryIndex]?.category_id);
        const firstMovieInCategoryIndex = movies.findIndex(movie => movie.category_id === categories[selectedCategoryIndex]?.category_id);
        const lastMovieInCategoryIndex = firstMovieInCategoryIndex + categoryMovies.length - 1;

        if (e.code === 'ArrowRight') {
          if (selectedMovieIndex < lastMovieInCategoryIndex) {
            setSelectedMovieIndex((prevIndex) => prevIndex + 1);
          }
          setMenu(false);
        } else if (e.code === 'ArrowLeft') {
          if (selectedMovieIndex > firstMovieInCategoryIndex) {
            setSelectedMovieIndex((prevIndex) => prevIndex - 1);
          } else if (selectedMovieIndex === firstMovieInCategoryIndex) {
            setMenu(true);
          }
        } else if (e.code === 'ArrowUp') {
          if (selectedCategoryIndex > 0) {
            setSelectedCategoryIndex((prevIndex) => prevIndex - 1);
            const firstMovieInPrevCategory = movies.findIndex(movie => movie.category_id === categories[selectedCategoryIndex - 1]?.category_id);
            setSelectedMovieIndex(firstMovieInPrevCategory);
            setMenu(false);
          }
        } else if (e.code === 'ArrowDown') {
          if (selectedCategoryIndex < categories.length - 1) {
            setSelectedCategoryIndex((prevIndex) => prevIndex + 1);
            const firstMovieInNextCategory = movies.findIndex(movie => movie.category_id === categories[selectedCategoryIndex + 1]?.category_id);
            setSelectedMovieIndex(firstMovieInNextCategory);
            setMenu(false);
          }
        }
      }
    };

    document.addEventListener('keydown', selectMovie);

    return () => {
      document.removeEventListener('keydown', selectMovie);
    };
  }, [selectedMovieIndex, selectedCategoryIndex, categories, movies]);

  useEffect(() => {
    const movieElement = document.querySelector(`.Card[data-index='${selectedMovieIndex}']`);
    if (movieElement && movieContainerRef.current) {
      movieContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedMovieIndex]);

  return (
    <MenuContext.Provider value={menu}>
      <AllMoviesContext.Provider value={{ categories, movies, loading }}>
        <IndexContext.Provider value={{ selectedMovieIndex, getFocusedMovieIndex }}>
          <div ref={movieContainerRef}>
            {children}
          </div>
        </IndexContext.Provider>
      </AllMoviesContext.Provider>
    </MenuContext.Provider>
  );
}
