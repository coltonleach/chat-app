import React from 'react'

const ChatCard = ({ name, avatar, id }) => {
  const handleClick = (id) => {
    console.log(`Click ${id}`)
  }

  return (
    <div className="chat-card" onClick={() => handleClick(id)}>
      <img alt='avatar' src={avatar} />
      <p>{name}</p>
    </div>
  )
}

export default ChatCard