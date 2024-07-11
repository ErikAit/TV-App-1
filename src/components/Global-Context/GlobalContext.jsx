// hooks import
import React, { createContext, useEffect, useState } from 'react'

export const IndexContext = createContext(null);

export default function GlobalContext({ children }) {
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);

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
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getFocusedMovieIndex = (focusedMovieIndex) => {
    setSelectedMovieIndex(focusedMovieIndex);
  }

  useEffect(() => {
    const selectMovie = (e) => {
      if (e.code === 'ArrowRight') {
        setSelectedMovieIndex(Math.min(selectedMovieIndex + 1, 2000));
      } else if (e.code === 'ArrowLeft') {
        setSelectedMovieIndex(Math.min(selectedMovieIndex - 1, 2000));
      }
    }

    document.addEventListener('keydown', selectMovie);

    return () => {
      document.addEventListener('keydown', selectMovie)
    }
  }, [selectedMovieIndex])

  return (
    <>
      <IndexContext.Provider value={{ selectedMovieIndex, getFocusedMovieIndex }}>
        {children}
      </IndexContext.Provider>
    </>
  )
}
