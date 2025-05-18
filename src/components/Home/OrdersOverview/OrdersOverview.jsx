import React from 'react';
import "./ordersOverview.css";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaBitcoin } from "react-icons/fa";
import bitcoin from "../../../assets/btc.png"
import eth from "../../../assets/eth.png"
import solana from "../../../assets/solana.png"

const OrdersOverview = () => {
  return (
    <div className='orders_overview'>
        <h1>Order Overview</h1>
        <p className='subtitle'><span><RiVerifiedBadgeFill style={{color:"#01B574", transform: "translateY(1.8px)", marginRight: "5px"}}/></span>+30% this month</p>
        <p>No order placed</p>
        {/* <div className='orders_contentbox' >
            <img src={bitcoin} alt="" srcset="" />
            <div className='orders_content'>
                <p>$2400, 0.025 BTC</p>
                <p className='order_sub'>01 May 7:22 PM</p>
            </div>
        </div>
        <div className='orders_contentbox' >
            <img src={eth} alt="" srcset="" />
            <div className='orders_content'>
                <p>$1900, 1.03 ETH</p>
                <p className='order_sub'>03 May 4:20 AM</p>
            </div>
        </div>
        <div className='orders_contentbox' >
            <img src={solana} alt="" srcset="" />
            <div className='orders_content'>
                <p>$1180.8, 8 SOL</p>
                <p className='order_sub'>04 May 6:13 PM</p>
            </div>
        </div> */}
    </div>
  )
}

export default OrdersOverview