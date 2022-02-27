import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search'
import {Link} from "react-router-dom"


class Header extends React.Component{
  
  render(){
    return (
      <div className='header'>
        
          <img src={process.env.PUBLIC_URL+"logo.png"} alt = 'Logo' className='logo' />
        <Link to='/library'>
          <button className='header__button'>Library</button>
        </Link>
        <div className='search'>
          <input type={'search'} placeholder='Search' className='search__bar'></input>
          <SearchIcon className='search__icon'/>
        </div>

        <div className='user'>
          <button className='header__button user__button' type="button">Log In</button>  
        </div>
        
        <div className='github'>
          <a href='https://github.com/prerak-123/vestigia' className='github__link'>GitHub</a>
        </div>

      </div>
      
    )
  }
}

export default Header