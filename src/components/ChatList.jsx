import { useState, useEffect, useContext } from 'react'
import ChatCard from './ChatCard'
import ListHeader from './ListHeader'
import SearchUser from './SearchUser'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const ChatList = () => {
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data())
      })

      return () => {
        unsub()
      }
    }

    currentUser.uid && getChats()
  }, [currentUser.uid])

  const handleSelect = (user) => {
    dispatch({ type: 'CHANGE_USER', payload: user })
  }

  return (
    <div className='chat-list'>
      <ListHeader />
      <SearchUser />
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <ChatCard
              key={chat[0]}
              id={chat[0]}
              name={chat[1].userInfo.displayName}
              avatar={chat[1].userInfo.photoURL}
              handleSelect={() => handleSelect(chat[1].userInfo)}
            />
          ))}
    </div>
  )
}

export default ChatList
