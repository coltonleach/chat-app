import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Notification from '../components/Notification'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'
import '../utils/buttons.scss'
import '../styles/form.scss'

const Login = () => {
  const [notification, setNotification] = useState({
    message: null,
    success: true,
  })
  const emailRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    setNotification({ message: null, success: true })
    try {
      const res = await sendPasswordResetEmail(auth, email)
      setNotification({
        message:
          'Recovery email has been sent. Be sure to check your spam folder!',
        success: true,
      })
    } catch (e) {
      console.log(e)
      if (e.code === 'auth/user-not-found')
        setNotification({ message: 'Email not found!', success: false })
      else setNotification({ message: 'Something went wrong!', success: false })
    }
    setTimeout(() => {
      setNotification({ message: null, success: true })
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
      <h2 className='title'>Recover Password</h2>
      <form className='form' onSubmit={handleSubmit}>
        <label>Email associated with your account:</label>
        <input ref={emailRef} type='email' />
        <div className='btn-container'>
          <button className='btn-primary'>Recover Password</button>
          <Link to='/login' className='btn-secondary'>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
