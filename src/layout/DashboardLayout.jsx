import React from 'react'
import "./dashboardLayout.css";
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { useParams } from 'react-router-dom';
import Homepage from '../pages/Homepage/Homepage';

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
        </div>
    </div>
  )
}

export default DashboardLayout