import React, { useState } from 'react'
import "./chatbot.css"
import { RiRobot3Fill } from "react-icons/ri";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
import { BiSolidCommentDetail } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";




const Chatbot = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [showChatbot, setShowChatbot] = useState(false);

    console.log(chatHistory, showChatbot);
  return (
    <div className={`chatbot ${showChatbot ? 'show-chatbot' : ''}`}>
        <button id="chatbot-toggle" onClick={() => setShowChatbot(prev => !prev)}>
            <span className="bot">
                <BiSolidCommentDetail />
            </span>
            <span className="close">
                <IoCloseSharp />
            </span>
        </button>
        <div className='chatbot-popup'>
            <div className="chat-header">
                <div className="header-info">
                    <RiRobot3Fill id='chatbot-logo'/>
                    <h2 className='logo-text'>Chatbot</h2>
                </div>
                <button><IoIosArrowDropdownCircle /></button>
            </div>
            <div className="chat-body">
                <div className="message bot-message">
                    <div className='bot_img'>
                        <RiRobot3Fill />
                    </div>
                    <p className="message-text">Hey there! <br/> How can i help you ?</p>
                </div>

                {
                    chatHistory.map((chat, i)=> (
                        <ChatMessage key={i} chat={chat}/>
                    ))
                }
            </div>
            <div className="chat-footer">
                <ChatForm setChatHistory={setChatHistory}/>
            </div>
        </div>
    </div>
  )
}

export default Chatbot