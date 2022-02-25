import React from 'react'
import './Header.css'

function Header() {
  return (
    <div className='header'>
    <img src={process.env.PUBLIC_URL+"logo.png"} alt = 'Logo' className='logo'/>
    </div>
  )
}

export default Header