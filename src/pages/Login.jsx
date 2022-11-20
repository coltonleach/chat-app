import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import Notification from '../components/Notification'
import '../utils/buttons.scss'
import '../styles/form.scss'

const Login = () => {
  const [notification, setNotification] = useState({
    message: null,
    success: true,
  })
  const navigate = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async (e) => {
    setNotification({
      message: null,
      success: true,
    })
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (err) {
      if (err.code === 'auth/wrong-password')
        setNotification({
          message: 'Incorrect email or password!',
          success: false,
        })
      else if (err.code === 'auth/user-not-found')
        setNotification({
          message: 'That email does not exist!',
          success: false,
        })
      else if (err.code === 'auth/too-many-requests')
        setNotification({
          message:
            'Too many failed attempt! Account has been temporarily locked.',
          success: false,
        })
      else if (err.code === 'auth/user-disabled')
        setNotification({
          message: 'That account is currently disabled!',
          success: false,
        })
      else setNotification({ message: 'Something went wrong!', success: false })
    }

    setTimeout(() => {
      setNotification({ message: null, success: false })
    }, 5000)
  }

  return (
    <div className='form-container'>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.success}
        />
      )}
      <h2 className='title'>Welcome back!</h2>
      <form className='form' onSubmit={handleSubmit}>
        <label>Email:</label>
        <input ref={emailRef} type='email' />
        <label>Password:</label>
        <input ref={passwordRef} type='password' />
        <div className='btn-container'>
          <button className='btn-primary'>Log In</button>
          <Link to='/register' className='btn-secondary'>
            Register
          </Link>
        </div>
      </form>
      <Link to='/recovery' className='btn-tertiary'>
        Forgot password?
      </Link>
    </div>
  )
}

export default Login
