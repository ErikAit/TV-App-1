import React from 'react'

export default function GlobalContext({ children }) {
  return (
    <div className='context'>
      {children}
    </div>
  )
}
