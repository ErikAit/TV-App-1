import React from 'react'

// css import
// import './Hillight-Movie-styles/hillightMovie.css'

export default function HillightMovie({ data }) {
  return (
    <div className='hillight-movie__container'>
      {
        data.length !== 0 &&
        <div style={{ backgroundImage: `url(https://images.iptv.rt.ru/images/c6u8v23ir4sslltu9m9g.jpg)` }} className="movie_image">
          <h2>Невидимый гость (2016)</h2>
        </div>
      }
    </div>
  )
}
