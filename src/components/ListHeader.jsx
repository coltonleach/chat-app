import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ChatHeader = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className='profile-header'>
      <img
        src={currentUser.photoURL}
        style={{
          width: '30px',
          height: '30px',
          objectFit: 'cover',
          borderRadius: '50%',
        }}
      />
      <p>{currentUser.displayName}</p>
      <Link to='/settings'>settings</Link>
    </div>
  )
}

export default ChatHeader
