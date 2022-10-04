import { useState } from 'react'
import AttachmentSvg from '../assets/svgcomponents/AttachmentSvg'
import SendSvg from '../assets/svgcomponents/SendSvg'

const ChatWindow = ({ active }) => {
  const handleSend = () => {
    console.log('sending...')
  }

  if (!active) {
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
      <div className='chat-header'>
        <img alt='avatar' src={'https://i.pravatar.cc/200'} />
        <h2>Brice</h2>
      </div>
      <div className='message-container'>
        <p className='message sent'>Hey how goes it?</p>
        <p className='message sent'>Anything new or exciting?</p>
        <p className='message received'>I'm doing well!</p>
      </div>
      <div className='message-input-container'>
        <label htmlFor='attachment'>
          <AttachmentSvg height={42} />
        </label>
        <input type='file' id='attachment' name='attachment'></input>
        <textarea autoFocus />
        <div className='send-container' onClick={handleSend}>
          <SendSvg />
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
