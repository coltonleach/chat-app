import React from 'react'

const ChatHeader = () => {
  const handleLogout = () => {
    console.log('logout')
  }

  return (
    <div className='profile-header'>
      <p>Colton</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default ChatHeader