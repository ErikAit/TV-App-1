import React, { useContext } from 'react'

// css import
import './menu-styles/Menu.css'
import { NavLink } from 'react-router-dom'
import { MenuContext } from '../Global-Context/GlobalContext'

export default function Menu() {

  const menu = useContext(MenuContext);

  return (
    <div className={`menu__container ${menu ? 'active' : ''}`}>
      <div className={`menu__content ${menu ? 'active' : ''}`}>
        <div className="categories__container">
          <div className='category'>
            <NavLink className='nav-link' to={'/'}>
              <div className="bx bx-home-alt"></div>
            </NavLink>
            <span>Lorem</span>
          </div>

          <div className='category'>
            <NavLink to={'/'}>
              <div className='bx bx-search'></div>
            </NavLink>
            <span>Lorem</span>
          </div>

          <div className='category'>
            <NavLink to={'/'}>
              <div className='bx bx-tv'></div>
            </NavLink>
            <span>Lorem</span>
          </div>


          <div className='category'>
            <NavLink to={'/'}>
              <div className='bx bxs-camera-movie'></div>
            </NavLink>
            <span>Lorem</span>
          </div>


          <div className='category'>
            <NavLink to={'/'}>
              <div className='bx bx-desktop'></div>
            </NavLink>
            <span>Lorem</span>
          </div>

          <div className='category'>
            <NavLink to={'/'}>
              <div className='bx bx-heart'></div>
            </NavLink>
            <span>Lorem</span>
          </div>
        </div>

        <div className="categories__container">
          <div className='category'>
            <div className='bx bxs-user'></div>
            <span>Lorem</span>
          </div>

          <div className='category'>
            <div className='bx bx-cog'></div>
            <span>Lorem</span>
          </div>

          <div className='category'>
            <div className='bx bx-power-off'></div>
            <span>Lorem</span>
          </div>
        </div>

        <div className="menu__icon">

        </div>
      </div>
    </div>
  )
}
