// hooks import
import React, { useEffect, useState } from 'react'

// category import
import Category from '../components/Category/Category';

// css import
import './Home-css/home.css'

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);

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
      <Category categoryData={categories} movieData={movies} />
    </div>
  )
}
