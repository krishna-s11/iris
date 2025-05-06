import React from 'react'
import "./authPage.css";
import { useParams, useNavigate } from 'react-router-dom';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import { IoCaretBackOutline } from "react-icons/io5";


const AuthPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div className='login_page'>
        <div className='auth_img_holder'>
          <div className='auth_back' onClick={() => {window.location.replace("https://iris-landing-xi.vercel.app/")}}>
            <IoCaretBackOutline />
          </div>
          <p>INSPIRED BY THE FUTURE</p>
          <h1>THE IRIS DASHBOARD</h1>
        </div>
        <div className='auth_content'>
            {
              params?.type === 'login'? <Login />: <Register />
            }
        </div>
    </div>
  )
}

export default AuthPage