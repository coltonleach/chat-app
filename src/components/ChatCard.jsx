import React from 'react'

const ChatCard = ({ name, avatar, handleSelect }) => {
  return (
    <div className='chat-card' onClick={handleSelect}>
      <img alt='avatar' src={avatar} />
      <p>{name}</p>
    </div>
  )
}

export default ChatCard
