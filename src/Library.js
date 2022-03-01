import React from 'react'
import Login from './Login'
import './Library.css'


class Library extends React.Component{
  render(){
  if(this.props.user==null){
    alert("Please Log In");
    return(
      <Login/>
    )
  }
  return (
    <div className='library'>
        <p className='title'>Your Library</p>
        <hr className='horizontal__line'/>
    </div>
  )
}
}

export default Library