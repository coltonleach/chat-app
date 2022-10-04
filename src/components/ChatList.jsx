import ChatCard from './ChatCard'
import ChatHeader from '../components/ChatHeader'
import SearchUser from './SearchUser'

const ChatList = ({ handleClick }) => {
  return (
    <div className='chat-list'>
      <ChatHeader />
      <SearchUser />
      <ChatCard id={1} name='Brice' avatar='https://i.pravatar.cc/200' />
      <ChatCard id={2} name='Maggie' avatar='https://i.pravatar.cc/150' />
    </div>
  )
}

export default ChatList
