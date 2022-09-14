import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../utils/buttons.scss'
import '../styles/form.scss'

const Login = () => {
  const handleSubmit = e => {
    e.preventDefault()
    console.log(e)
    console.log("login")
  }

  return (
    <div className='form-container'>
      <h2 className='title'>Welcome back!</h2>
      <form className='form' onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email"/>
        <label>Password:</label>
        <input type="password"/>
        <div className='btn-container'>
          <button className='btn-primary'>Log In</button>
          <Link to='/register' className='btn-secondary'>Register</Link>
        </div>
      </form>
      <Link to='/recovery' className='btn-tertiary'>Forgot password?</Link>
    </div>
  )
}

export default Login