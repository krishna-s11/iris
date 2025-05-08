import React, { useEffect, useState } from 'react';
import "./sidebar.css";
import logo from "../../assets/iris_logo.png";
import divider from "../../assets/divider.png";
import dash_home from "../../assets/dash_home.svg";
import profile_ico from "../../assets/profile_ico.svg";
import signout_ico from "../../assets/signout_ico.svg";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

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
        <img src={logo} alt="Octify"/>
      </div>
      <div className="divider">
        <img src={divider} alt="divider"/>
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <ul className='sidemenu'>
          <li className={`menu-item ${params.page === 'home' ? 'active' : ''}`}>
            <img src={dash_home} alt="" /> Dashboard
          </li>
          <li><img src={profile_ico} alt="" /> Profile</li>
          <li onClick={handleLogout}><img src={signout_ico} alt="" /> Sign Out</li>
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
          <img src={dash_home} alt="" />
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
