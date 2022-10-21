import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

const ChatHeader = () => {
  const { data } = useContext(ChatContext)

  return (
    <div className='chat-header'>
      <img alt='avatar' src={data.user?.photoURL} />
      <h2>{data.user?.displayName}</h2>
    </div>
  )
}

export default ChatHeader
