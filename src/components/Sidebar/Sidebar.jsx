import React from 'react'
import "./sidebar.css";
import logo from "../../assets/logo.webp";
import divider from "../../assets/divider.png";
import dash_home from "../../assets/dash_home.svg";
import profile_ico from "../../assets/profile_ico.svg";
import signout_ico from "../../assets/signout_ico.svg";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const params = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    toast.success('Signed out successfully!', {
      onClose: () => {
        navigate('/auth/login');
      },
      autoClose: 1000,
    });
  };

  return (
    <div className='sidebar'>
        <div className="titlebox">
            <img src={logo} alt="Octify"/>
        </div>
        <div className="divider">
            <img src={divider} alt="divider"/>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <ul className='sidemenu'>
                <li  className={`menu-item ${params.page === 'home' ? 'active' : ''}`}><img src={dash_home} alt="" /> Dashboard</li>
                <li><img src={profile_ico} alt="" /> Profile</li>
                <li onClick={handleLogout}><img src={signout_ico} alt="" /> Sign Out</li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar