import { useState, useContext } from 'react'
import ChatCard from './ChatCard'
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const SearchUser = () => {
  const [searchUser, setSearchUser] = useState('')
  const [user, setUser] = useState(null)

  const { currentUser } = useContext(AuthContext)

  const handleSelect = async () => {
    console.log(user.uid)

    //check whether the group(chats in firestore) exists
    //if not, create new one
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid

    try {
      const res = await getDocs(db, 'chats', combinedId)

      if (!res.exists()) {
        //create a chat within chats collection
        await setDoc(doc, (db, 'chats', combinedId), { messages: [] })
      }
    } catch (err) {
      console.log(err)
    }

    //create user chats
  }

  const handleSearch = async () => {
    console.log(`searching for ${searchUser}`)
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', searchUser)
    )

    const querySnapshot = await getDocs(q)
    try {
      querySnapshot.forEach((docUser) => {
        setUser(docUser.data())
      })
    } catch (err) {
      console.log(err)
    }
  }
  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch()
  }

  return (
    <div>
      <input
        type='text'
        placeholder='search a user...'
        maxLength={30}
        onChange={(e) => setSearchUser(e.target.value)}
        onKeyDown={handleKey}
      />
      {user && (
        <ChatCard
          name={user.displayName}
          avatar={user.photoURL}
          handleSelect={handleSelect}
        />
      )}
    </div>
  )
}

export default SearchUser
