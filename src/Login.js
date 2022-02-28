import React from 'react'
import './Login.css'
import Snowfall from 'react-snowfall'
import { signInWithGoogle } from './firebase';

function Login() {
  return (
    <div className='login'>
        <Snowfall color='white'/>
        <LoginPanel/>
    </div>
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