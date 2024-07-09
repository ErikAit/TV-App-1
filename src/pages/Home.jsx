// hooks import
import React, { useEffect, useState } from 'react'

// category import
import Category from '../components/Category/Category';

// css import
import './Home-css/home.css'
import HillightMovie from '../components/Hillight-Movie/HillightMovie';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://inter.natv.fm/player_api.php?username=rokuappdev&password=20928292684&action=get_vod_categories')
      .then((resolve) => resolve.json())
      .then((data) => setCategories(data));

    fetch('https://inter.natv.fm/player_api.php?username=rokuappdev&password=20928292684&action=get_vod_streams')
      .then((resolve) => resolve.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div className='Home__container'>
      <HillightMovie data={movies} />

      <Category categoryData={categories} movieData={movies} />
    </div>
  )
}
