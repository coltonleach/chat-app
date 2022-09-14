import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../utils/buttons.scss'
import '../styles/form.scss'

const Login = () => {
  const handleSubmit = e => {
    e.preventDefault()
    console.log(e)
    console.log("Recover password")
  }

  return (
    <div className='form-container'>
      <h2 className='title'>Recover Password</h2>
      <form className='form' onSubmit={handleSubmit}>
        <label>Email associated with your account:</label>
        <input type="email"/>
        <div className='btn-container'>
          <button className='btn-primary'>Recover Password</button>
          <Link to='/' className='btn-secondary'>Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default Login