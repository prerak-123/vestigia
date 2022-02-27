import React from 'react'
import './Login.css'
import Snowfall from 'react-snowfall'

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
        <div className='heading'>
        <p>Log In</p>
        </div>
        <div className='credentials'>
          <form>
            <label>
              <input type='email' placeholder='Email Address'/>
            </label>
            <label>
              <input type='password' placeholder='Password'/>
            </label>
            <label>
            <input type="submit" value="LOG IN" className = 'submit__button'/>
            </label>
          </form>
        </div>
        <p>Forgot Password?</p>
      </div>
    )
  }
}

class SignUpPanel extends React.Component{
  render(){
    return(
      <div className='panel'>
        <div className='heading'>
        <p>Sign Up</p>
        </div>
        <div className='credentials'>
          <form>
            <label>
              <input type='email' placeholder='Email Address'/>
            </label>
            <label>
              <input type='password' placeholder='Password'/>
            </label>
            <label>
            <input type="submit" value="SIGN UP" className = 'submit__button'/>
            </label>
          </form>
        </div>
      </div>
    )
  }
}

class NewPasswordPanel extends React.Component{
  render(){
    return(
      <div className='panel'>
        <div className='heading'>
        <p>Reset Password</p>
        </div>
        <div className='credentials'>
          <form>
            <label>
              <input type='password' placeholder='New Password'/>
            </label>
            <label>
              <input type='password' placeholder='Confirm New Password'/>
            </label>
            <label>
            <input type="submit" value="CHANGE PASSWORD" className = 'submit__button'/>
            </label>
          </form>
        </div>
      </div>
    )
  }
}

class ResetPasswordPanel extends React.Component{
  render(){
    return(
      <div className='panel'>
        <div className='heading'>
        <p>Reset Password</p>
        </div>
        <div className='credentials'>
          <form>
            <label>
              <input type='email' placeholder='Email'/>
            </label>
            <label>
            <input type="submit" value="RESET PASSWORD" className = 'submit__button'/>
            </label>
          </form>
        </div>
      </div>
    )
  }
}


export default Login