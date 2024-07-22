import React, { useContext } from 'react'

// css import
import './menu-styles/Menu.css'
import { NavLink } from 'react-router-dom'
import { useFocusStore } from '../../requests/requests'

export default function Menu() {
  const isFirstSelected = useFocusStore((state) => state.isFirstSelected);

  return (
    <div className={`menu__container ${isFirstSelected === true ? 'active' : ''}`}>
      <div className='menu__content'>
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

      <div className="open__menu__container">
        <div className="open__menu__content">
          <div>
            <span>lorem</span>
          </div>
          <div>
            <span>lorem</span>
          </div>
          <div>
            <span>lorem</span>
          </div>
          <div>
            <span>lorem</span>
          </div>
          <div>
            <span>lorem</span>
          </div>
          <div>
            <span>lorem</span>
          </div>
          <div>
            <span>lorem</span>
          </div>
          <div>
            <span>lorem</span>
          </div>
          <div>
            <span>lorem</span>
          </div>
        </div>
      </div>
    </div >
  )
}
