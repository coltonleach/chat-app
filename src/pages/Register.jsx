import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, getDownloadURL } from 'firebase/storage'
import { auth, storage, db } from '../firebase'
import '../utils/buttons.scss'
import '../styles/form.scss'
import Notification from '../components/Notification'
import { setDoc, doc } from 'firebase/firestore'

const Register = () => {
  const [notification, setNotification] = useState({
    message: null,
    success: true,
  })
  const navigate = useNavigate()
  const displayNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = displayNameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const confirmPassword = confirmPasswordRef.current.value

    if (displayName.length < 3) {
      setNotification({
        message: 'Display name must be 3 or more characters!',
        success: false,
      })
    } else if (password !== confirmPassword) {
      setNotification({ message: 'Passwords do not match!', success: false })
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password)

        //Getting reference to the default avatar within Fire Storage
        const defaultAvatarRef = ref(storage, 'assets/pfp_default.jpg')
        //Getting the URL from said reference
        const photoURL = await getDownloadURL(defaultAvatarRef)

        //Assigning the user's display name and avatar
        await updateProfile(res.user, {
          displayName,
          photoURL,
        })

        await setDoc(doc(db, 'users', res.user.uid), {
          uid: res.user.uid,
          displayName,
          photoURL,
          email,
        })

        await setDoc(doc(db, 'userChats', res.user.uid), {})

        navigate('/')
      } catch (err) {
        if (err.code === 'auth/email-already-in-use')
          setNotification({
            message: 'Email is already in use!',
            success: false,
          })
        if (err.code === 'auth/weak-password')
          setNotification({
            message: 'Password should be at least 6 characters!',
            success: false,
          })
      }
    }

    setTimeout(() => {
      setNotification({
        message: null,
        success: true,
      })
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
      <h2 className='title'>Register an account</h2>
      <form className='form' onSubmit={handleSubmit}>
        <label>Display name:</label>
        <input ref={displayNameRef} type='text' maxLength={30} />
        <label>Email:</label>
        <input ref={emailRef} type='email' />
        <label>Password:</label>
        <input ref={passwordRef} type='password' />
        <label>Confirm Password:</label>
        <input ref={confirmPasswordRef} type='password' />
        <div className='btn-container'>
          <button className='btn-primary'>Create Account</button>
          <Link to='/login' className='btn-secondary'>
            Login
          </Link>
        </div>
      </form>
      <Link to='/recovery' className='btn-tertiary'>
        Forgot password?
      </Link>
    </div>
  )
}

export default Register
