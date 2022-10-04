import { useState } from 'react'
import ChatList from '../components/ChatList'
import ChatWindow from '../components/ChatWindow'
import '../styles/chat.scss'

const Chat = () => {
  const [active, setActive] = useState(null)

  return (
    <div className='chat-container'>
      <ChatList />
      <ChatWindow active={active} />
    </div>
  )
}

export default Chat
