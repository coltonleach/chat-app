import React from 'react'
import '../styles/alertMessage.scss'

const Notification = ({ message, type }) => {
  return <p className={type ? 'success' : 'error'}>{message}</p>
}

export default Notification
