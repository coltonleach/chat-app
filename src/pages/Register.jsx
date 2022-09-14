import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../utils/buttons.scss'
import '../styles/form.scss'

const Register = () => {
  const handleSubmit = e => {
    e.preventDefault()
    console.log(e)
    console.log("register")
  }

  return (
    <div className='form-container'>
      <h2 className='title'>Register an account</h2>
      <form className='form' onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email"/>
        <label>Password:</label>
        <input type="password"/>
        <label>Confirm Password:</label>
        <input type="password"/>
        <div className='btn-container'>
          <button className='btn-primary'>Create Account</button>
          <Link to='/' className='btn-secondary'>Login</Link>
        </div>
      </form>
      <Link to='/recovery' className='btn-tertiary'>Forgot password?</Link>
    </div>
  )
}

export default Register