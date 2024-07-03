import React from 'react'

// route import
import { Outlet } from 'react-router-dom'

export default function Menu__Layout() {
  return (
    <div className='menu_layout_container'>
      <Outlet />
    </div>
  )
}
