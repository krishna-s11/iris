import React from 'react'
import "./dashboardLayout.css";
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { useParams } from 'react-router-dom';
import Homepage from '../pages/Homepage/Homepage';
import Chatbot from '../components/Chatbot/Chatbot';
import Wallet from '../pages/Wallet/Wallet';
import Trade from '../pages/Trade/Trade';

const DashboardLayout = () => {
  const params = useParams();
  return (
    <div className='dashboard_layout'>
        <Sidebar />
        <div className='rightpane'>
          <Header />
          {
            params.page === 'home'?<Homepage />:null
          }
          {
            params.page === 'wallet'?<Wallet />:null
          }
          {
            params.page === 'trade'?<Trade />:null
          }
        </div>
        <div className='chatbot_bottom'>
            <Chatbot />
        </div>
    </div>
  )
}

export default DashboardLayout