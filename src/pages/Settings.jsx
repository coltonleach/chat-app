import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { updateProfile, updatePassword, signOut } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, storage, db } from '../firebase'
import Notification from '../components/Notification'
import '../utils/buttons.scss'
import '../styles/form.scss'

const Settings = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    signOut(auth)
    navigate('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setNotification({ message: null, success: true })

    const displayName = displayNameRef.current.value
    const avatar = avatarRef.current.files[0]
    const newPassword = newPasswordRef.current.value
    const confirmNewPassword = confirmNewPasswordRef.current.value

    const updateAvatar = async () => {
      const storageRef = ref(storage, `${auth.currentUser.uid}/avatar.jpg`)
      try {
        const res = await uploadBytes(storageRef, avatar)

        const photoURL = await getDownloadURL(storageRef)

        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          photoURL,
        })

        await updateProfile(auth.currentUser, {
          photoURL,
        })

        setNotification({
          message: 'Successfully updated avatar!',
          success: true,
        })
      } catch (err) {
        setNotification({
          message: 'Failed to upload file!',
          success: false,
        })
      }
    }

    const updateDisplayName = async () => {
      try {
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          displayName,
        })

        await updateProfile(auth.currentUser, {
          displayName,
        })
        setNotification({
          message: 'Successfully updated display name!',
          success: true,
        })
      } catch (err) {
        console.log(err)
        setNotification({
          message: 'Error when changing display name!',
          success: false,
        })
      }
    }

    if (newPassword) {
      if (newPassword === confirmNewPassword) {
        try {
          const res = await updatePassword(auth.currentUser, newPassword)
          setNotification({
            message: 'Passwords updated successfully!',
            success: true,
          })
        } catch (err) {
          setNotification({
            message: 'Something went wrong when updating your password!',
            success: false,
          })
        }
      } else {
        setNotification({
          message: 'New passwords do not match!',
          success: false,
        })
      }
    }

    if (displayName) updateDisplayName()
    if (avatar) updateAvatar()

    setTimeout(() => {
      setNotification({ message: null, success: true })
    }, 5000)
  }

  const [notification, setNotification] = useState({
    message: null,
    success: true,
  })
  const displayNameRef = useRef()
  const avatarRef = useRef()
  const newPasswordRef = useRef()
  const confirmNewPasswordRef = useRef()

  return (
    <div className='form-container'>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.success}
        />
      )}
      <button className='btn-tertiary btn-logout' onClick={handleLogout}>
        Logout
      </button>
      <h2 className='title'>Settings</h2>
      <form className='form' onSubmit={handleSubmit}>
        <label
          className='btn-avatar btn-primary'
          htmlFor='newAvatar'
          style={{ marginBottom: '1rem' }}
        >
          Select Avatar
        </label>
        <input
          ref={avatarRef}
          type='file'
          id='newAvatar'
          name='newAvatar'
          style={{ display: 'none' }}
        />
        <label>Display name:</label>
        <input ref={displayNameRef} type='text' maxLength={30} />
        <label>New Password:</label>
        <input ref={newPasswordRef} type='password' />
        <label>Confirm New Password:</label>
        <input ref={confirmNewPasswordRef} type='password' />
        <div className='btn-container'>
          <button className='btn-primary'>Save Settings</button>
          <Link to='/' className='btn-secondary'>
            Back
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Settings
