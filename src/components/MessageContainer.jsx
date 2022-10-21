import { useEffect, useContext, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'

const MessageContainer = ({ messages }) => {
  const { currentUser } = useContext(AuthContext)
  const messageRef = useRef()

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className='message-container'>
      {messages.map((message) => {
        const type = currentUser.uid === message?.senderId ? 'sent' : 'received'
        if (message.hasOwnProperty('img')) {
          return (
            <img
              ref={messageRef}
              key={message.id}
              className={`message message-img ${type}`}
              src={message.img}
              alt='user-image'
            />
          )
        }

        return (
          <p ref={messageRef} className={`message ${type}`} key={message.id}>
            {message.text}
          </p>
        )
      })}
    </div>
  )
}

export default MessageContainer
