import React, { useEffect, useState } from 'react';

// css import
import './Home-css/home.css';

// components import
import Category from '../components/Category/Category';
import HillightMovie from '../components/Hillight-Movie/HillightMovie';
import Loading from '../components/Loading/Loading';
import GlobalContext from '../components/Global-Context/GlobalContext';

export default function Home() {
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

  return (
    <div className='Home__container'>
      {loading && <Loading />}
      <HillightMovie data={movies} />
      <GlobalContext children={<Category categoryData={categories} movieData={movies} />} />
    </div>
  );
}
