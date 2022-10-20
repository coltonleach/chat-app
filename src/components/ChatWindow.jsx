import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import Input from './Input'

const ChatWindow = () => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })
    return () => {
      unSub()
    }
  }, [data.chatId])

  if (!Object.keys(data.user).length) {
    return (
      <div
        className='chat-window'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Select a friend in the friend's list to start a conversation
      </div>
    )
  }
  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <img alt='avatar' src={data.user?.photoURL} />
        <h2>{data.user?.displayName}</h2>
      </div>
      <div className='message-container'>
        {messages.map((message) => {
          const type =
            currentUser.uid === message?.senderId ? 'sent' : 'received'
          if (message.hasOwnProperty('img')) {
            return (
              <img
                key={message.id}
                className={`message message-img ${type}`}
                src={message.img}
                alt='user-image'
              />
            )
          }

          return (
            <p className={`message ${type}`} key={message.id}>
              {message.text}
            </p>
          )
        })}
      </div>
      <Input />
    </div>
  )
}

export default ChatWindow
