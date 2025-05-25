import React from 'react'
import { useEffect, useState } from 'react';
import "./header.css";
import bell from "../../assets/bell.svg";
import api from '../../api/api';

const Header = ({wallet}) => {
console.log("wallet prop in Header:", wallet);
  return (
    <div className='header'>
        <div className='header_left'>
            <p>Iris / <span>Home</span></p>
            <p>Dashboard</p>
        </div>
        {!wallet && (
          <div className="binance-warning">
            Please connect your binance wallet to start trading.
          </div>
        )}
        <img src={bell} alt="notifications"/>
    </div>
  )
}

export default Header