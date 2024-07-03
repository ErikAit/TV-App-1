import React from 'react'

// route import
import { Outlet } from 'react-router-dom'

// component import
import Menu from '../../menu/Menu'

export default function Menu__Layout() {
  return (
    <div className='menu_layout_container'>
      <Menu />
      <Outlet />
    </div>
  )
}
