import ChatList from '../components/ChatList'
import ChatWindow from '../components/ChatWindow'
import '../styles/chat.scss'

const Chat = () => {
  return (
    <div className='chat-container'>
      <ChatList />
      <ChatWindow /> 
    </div>
  )
}

export default Chat