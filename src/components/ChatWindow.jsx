import AttachmentSvg from '../assets/svgcomponents/AttachmentSvg'
import '../styles/chat.scss'

const ChatWindow = () => {
  return (
    <div className='chat-window'>
      <h2>Brice</h2>
      <div className="message-container">
        <p className="message sent">Hey how goes it?</p>
        <p className="message sent">Anything new or exciting?</p>
        <p className="message received">I'm doing well!</p>
      </div>
      <div className='message-input-container'>
        <label for='attachment'><AttachmentSvg height={42} /></label>
        <input type='file' id='attachment' name='attachment' style={{display: 'none'}}></input>
        <textarea autoFocus />
      </div>
    </div>
  )
}

export default ChatWindow