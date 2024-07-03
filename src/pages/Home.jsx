// hooks import
import React, { useEffect, useState } from 'react'
import Category from '../components/Category/Category';

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://inter.natv.fm/player_api.php?username=rokuappdev&password=20928292684&action=get_vod_categories')
      .then((resolve) => resolve.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className='Home__container'>
      <Category categoryData={categories} />
    </div>
  )
}
