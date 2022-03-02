import React from 'react'
import './Login.css'
import Snowfall from 'react-snowfall'
import { signInWithGoogle } from './firebase';
import Home from './Home'

function Login(props) {
  if(props.user == null){
    return (
      <div className='login'>
          <Snowfall color='white'/>
          <LoginPanel/>
      </div>
    )
  }
  alert("Logged in Successfully!")
  return(
    <Home/>
  )
}

class LoginPanel extends React.Component{
  render(){
    return(
      <div className='panel'>
        <img src={process.env.PUBLIC_URL+"google_login.png"} alt='Login' className='google__signin' onClick={signInWithGoogle}/>        
      </div>
    )
  }
}

export default Login