import React from 'react'

// css import
import './menu-styles/Menu.css'

export default function Menu() {
  return (
    <div className='menu__container'>
      <div className="menu__content">
        <div className="categories__container">
          <div className="bx bx-home-alt"></div>
          <div className='bx bx-search'></div>
          <div className='bx bx-tv'></div>
          <div className='bx bxs-camera-movie'></div>
          <div className='bx bx-desktop'></div>
          <div className='bx bx-heart'></div>
        </div>

        <div className="categories__container">
          <div className='bx bxs-user'></div>
          <div className='bx bx-cog'></div>
          <div className='bx bx-power-off'></div>
        </div>

        <div className="menu__icon">

        </div>
      </div>
    </div>
  )
}
