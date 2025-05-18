import React, { useEffect, useState } from 'react';
import "./sidebar.css";
import logo from "../../assets/iris_logo.png";
import wallet from "../../assets/wallet1.png";
import trade from "../../assets/trade1.png";
import profile from "../../assets/user1.png";
import signout from "../../assets/signout1.png";
import divider from "../../assets/divider.png";
import dash_home from "../../assets/home.png";
import profile_ico from "../../assets/profile_ico.svg";
import signout_ico from "../../assets/signout_ico.svg";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import money from "../../assets/money.svg";

// Desktop Sidebar
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
        <img src={logo} alt="Iris"/>
      </div>
      <div className="divider">
        <img src={divider} alt="divider"/>
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <ul className='sidemenu'>
          <li className={`menu-item ${params.page === 'home' ? 'active' : ''}`} onClick={() => {navigate('/dashboard/home')}}>
            <img src={dash_home} style={{borderRadius: "11px", marginBottom: "4px"}} alt="" /> Dashboard
          </li>
          <li className={`menu-item ${params.page === 'trade' ? 'active' : ''}`} onClick={() => {navigate('/dashboard/trade')}}><img src={trade} style={{borderRadius: "11px", marginBottom: "4px"}} alt=""  /> Trade</li>
          <li className={`menu-item ${params.page === 'wallet' ? 'active' : ''}`} onClick={() => {navigate('/dashboard/wallet')}}><img src={wallet} style={{borderRadius: "11px", marginBottom: "4px"}} alt="" /> Wallet</li>
          <li><img src={profile} style={{borderRadius: "10px", marginBottom: "4px"}} alt="" /> Profile</li>
          <li onClick={handleLogout}><img src={signout} style={{borderRadius: "10px", marginBottom: "4px"}} alt="" /> Sign Out</li>
        </ul>
      </div>
    </div>
  );
};

// Mobile Sidebar
const MobSidebar = () => {
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
    <div className='mob_sidebar'>
      <ul className='mob_sidemenu'>
        <li className={`menu-item ${params.page === 'home' ? 'active' : ''}`}>
          <img src={home} alt="" onClick={() => {navigate('/dashboard/home')}}/>
        </li>
        <li className={`menu-item ${params.page === 'home' ? 'active' : ''}`}>
          <img src={money} alt="" onClick={() => {navigate('/dashboard/wallet')}}/>
        </li>
        <li><img src={profile_ico} alt="" /></li>
        <li onClick={handleLogout}><img src={signout_ico} alt="" /></li>
      </ul>
    </div>
  );
};

// Responsive Sidebar Wrapper
const ResponsiveSidebar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // cleanup
  }, []);

  return isMobile ? <MobSidebar /> : <Sidebar />;
};

export default ResponsiveSidebar;
