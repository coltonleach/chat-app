import { useRef, useContext, useState } from 'react'
import AttachmentSvg from '../assets/svgcomponents/AttachmentSvg'
import SendSvg from '../assets/svgcomponents/SendSvg'
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import { db, storage } from '../firebase'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Input = () => {
  const [image, setImage] = useState(null)
  const textRef = useRef()
  const imageRef = useRef()
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const handleSend = async () => {
    const image = imageRef.current.files[0]
    const text = textRef.current.value
    if (image) {
      //send image
      const storageRef = ref(storage, uuid())
      const uploadTask = uploadBytesResumable(storageRef, image)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Progress: ${progress}%`)
        },
        (err) => {
          console.log('inside uploadTask error')
          console.log(err)
        },
        () => {
          console.log('file uploaded')
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            })
          })
        }
      )
      imageRef.current.value = ''
    }
    if (text) {
      //send text
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      })
      textRef.current.value = ''
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    })

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    })
    setImage(null)
  }

  const handleKeyDown = (e) =>
    e.code === 'Enter' && !e.shiftKey ? handleSend() : null

  const handleAttachment = (e) => {
    setImage(e.target.files[0])
  }
  return (
    <div className='message-input-container'>
      {image && (
        <div className='selected-attachment-container'>
          <img
            className='selected-attachment'
            alt='avatar'
            src={URL.createObjectURL(image)}
          />
        </div>
      )}
      <label htmlFor='attachment'>
        <AttachmentSvg height={42} />
      </label>
      <input
        type='file'
        id='attachment'
        name='attachment'
        accept='image/*'
        ref={imageRef}
        onChange={(e) => handleAttachment(e)}
      ></input>
      <textarea autoFocus ref={textRef} onKeyDown={handleKeyDown} />
      <div className='send-container' onClick={handleSend}>
        <SendSvg />
      </div>
    </div>
  )
}

export default Input
