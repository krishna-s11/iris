import React, {useRef} from 'react'
import { FaChevronRight } from "react-icons/fa6";

const ChatForm = ({setChatHistory}) => {
  const inputRef = useRef();


  const handleFormSubmit = e => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if(!userMessage) return;
    inputRef.current.value = "";

    setChatHistory(history => [...history, {role: "user", text: userMessage}]);

    setTimeout(() => setChatHistory((history) => [...history, {role: "model", text: "Thinking..."}]), 600)
  }

  return (
    <form action="#" className='chat-form' onSubmit={handleFormSubmit}>
        <input ref={inputRef} type="text" className="message-input" placeholder='Message...' required/>
        <button><FaChevronRight/></button>
    </form>
  )
}

export default ChatForm