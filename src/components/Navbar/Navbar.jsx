import React from 'react'
import "./navbar.css";
import logo from "../../assets/logo.webp"
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div class="navbar">
        <img src={logo} alt="octifi" class="main_logo"/>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Docs</li>
            <li>Litepaper</li>
        </ul>
        <button className='btn_contactus' onClick={() => {navigate("/auth/login")}}>Sign In</button>
    </div>
  )
}

export default Navbar