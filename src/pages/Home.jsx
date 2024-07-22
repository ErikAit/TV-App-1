import React from 'react';

// css import
import './Home-css/home.css';

// components import
import Category from '../components/Category/Category';
import HillightMovie from '../components/Hillight-Movie/HillightMovie';
import Loading from '../components/Loading/Loading';

export default function Home() {

  return (
    <div className='Home__container'>
      {/* {loading && <Loading />} */}
      {/* <HillightMovie data={movies} /> */}
      <Category />
    </div>
  );
}
