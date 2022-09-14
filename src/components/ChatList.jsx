import ChatCard from './ChatCard'
import ChatHeader from '../components/ChatHeader'

const ChatList = () => {
  return (
    <div className='chat-list'>
      <ChatHeader />
      <input type='text' placeholder='search a user...' maxLength={30} />
      <ChatCard id={1} name='Brice' avatar='https://i.pravatar.cc/200' />
      <ChatCard id={2} name='Maggie' avatar='https://i.pravatar.cc/150' />
    </div>
  )
}

export default ChatList