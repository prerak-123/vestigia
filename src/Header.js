import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';

function Header(props) {
  return (
    <div className='header'>

      <img src={process.env.PUBLIC_URL+"logo.png"} alt = 'Logo' className='logo'/>

      <button className='header__button'>Library</button>

      <div className='search'>
        <input type={'search'} placeholder='Search' className='search__bar'></input>
        <SearchIcon className='search__icon'/>
      </div>

      <div className='github__link'>
        <button className='header__button' type="button" onClick={(e) => {
          e.preventDefault();
          window.location.href='https://github.com/prerak-123/vestigia';
        }
        }>GitHub</button>
      </div>

      <div className='user'>
        <button className='header__button user__button' type="button">{props.user}</button>  
      </div>
    </div>
    
  )
}

export default Header