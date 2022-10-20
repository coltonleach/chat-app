import { useState, useContext } from 'react'
import ChatCard from './ChatCard'
import {
  collection,
  query,
  where,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDocs,
} from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const SearchUser = () => {
  const [searchUser, setSearchUser] = useState('')
  const [user, setUser] = useState(null)

  const { currentUser } = useContext(AuthContext)

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists
    //if not, create new one
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid

    try {
      const res = await getDoc(doc(db, 'chats', combinedId))

      if (!res.exists()) {
        //create a chat within chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] })

        //create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })
      }
    } catch (err) {
      console.log(err)
    }
    setUser(null)
    setSearchUser('')
  }

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', searchUser)
    )

    try {
      const querySnapshot = await getDocs(q)
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
        value={searchUser}
      />
      {user && (
        <>
          <ChatCard
            name={user.displayName}
            avatar={user.photoURL}
            handleSelect={handleSelect}
          />
          <div style={{ borderBottom: '1px solid white' }} />
        </>
      )}
    </div>
  )
}

export default SearchUser
