import React from 'react'
import { RiRobot3Fill } from "react-icons/ri";

const ChatMessage = ({chat}) => {
    console.log(chat);
  return (
    <div className={`message ${chat.role === 'model'? 'bot' : 'user'}-message`}>
        {chat.role === 'model' && <div className='bot_img'><RiRobot3Fill /></div>}
        <p className="message-text">{chat.text}</p>
    </div>
  )
}

export default ChatMessage