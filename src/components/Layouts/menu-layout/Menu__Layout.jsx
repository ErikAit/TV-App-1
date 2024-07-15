import React from 'react'

// route import
import { Outlet } from 'react-router-dom'

// component import
import Menu from '../../menu/Menu'
import GlobalContext from '../../Global-Context/GlobalContext'

// css import
import './menu-layout-styles/MenuLayout.css'

export default function Menu__Layout() {
  return (
    <div className='menu_layout_container'>
      <GlobalContext children={<Menu />} />
      <Outlet />
    </div>
  )
}
