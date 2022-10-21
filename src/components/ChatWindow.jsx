import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import Input from './Input'
import ChatHeader from './ChatHeader'
import MessageContainer from './MessageContainer'

const ChatWindow = () => {
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
      <ChatHeader />
      <MessageContainer messages={messages} />
      <Input />
    </div>
  )
}

export default ChatWindow
