import React, {useState, useEffect} from 'react'
import "./dashboardLayout.css";
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { useParams } from 'react-router-dom';
import Homepage from '../pages/Homepage/Homepage';
import Chatbot from '../components/Chatbot/Chatbot';
import Wallet from '../pages/Wallet/Wallet';
import Trade from '../pages/Trade/Trade';
import './dashboardLayout.css';
import api from "../api/api"
import Profile from '../pages/Profile/Profile';
import useIsWalletConnected from '../hooks/useIsWalletConnected';


const DashboardLayout = () => {
  const params = useParams();
  const isWalletConnected = useIsWalletConnected();
  const [userInfo,setUserInfo] = useState(null);

    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await api.get('/auth/userinfo');
          const { binance_api_key, binance_api_secret } = response.data;
          setUserInfo(response.data);
          if (!binance_api_key || !binance_api_secret) {
            setWalletKey(binance_api_key);
            setWalletSecret(binance_api_secret);
          }
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        }
      };
  
      fetchUserInfo();
    }, []);

  return (
    <div className='dashboard_layout'>
      <Sidebar />
      <div className='rightpane'>
        <Header wallet={isWalletConnected} />
        {params.page === 'home' ? <Homepage isWallet={isWalletConnected}/> : null}
        {params.page === 'wallet' ? <Wallet user={userInfo} /> : null}
        {params.page === 'trade' ? <Trade user={userInfo}/> : null}
        {params.page === 'profile' ? <Profile user={userInfo}/> : null}
      </div>
      <div className='chatbot_bottom'>
        <Chatbot />
      </div>
    </div>
  );
};

export default DashboardLayout
