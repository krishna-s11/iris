import React from 'react'
import "./header.css";
import bell from "../../assets/bell.svg";

const Header = () => {
  return (
    <div className='header'>
        <div className='header_left'>
            <p>Iris / <span>Home</span></p>
            <p>Dashboard</p>
        </div>
        <img src={bell} alt="notifications"/>
    </div>
  )
}

export default Header