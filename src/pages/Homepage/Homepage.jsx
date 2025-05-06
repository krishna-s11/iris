import React, { useEffect } from 'react'
import "./homepage.css";
import money from "../../assets/money.svg";
import world from "../../assets/world.svg";
import document from "../../assets/document.svg";
import api from "../../api/api";
import PredictionPanel from '../../components/Home/PredictionPanel/PredictionPanel';
import btc from "../../assets/btc.png";
import eth from "../../assets/eth.png";
import solana from "../../assets/solana.png";
import TradingTable from '../../components/Home/TradingTable/TradingTable';

const Homepage = () => {

    const fetchPortfolio = async () => {
        try {
          const response = await api.get("/portfolio");
          console.log("Portfolio data:", response.data);
          return response.data;
        } catch (error) {
          if (error.response?.status === 401) {
            console.warn("Token expired or invalid, redirecting to login");
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            window.location.href = "/auth/login";
          } else {
            console.error("Error fetching portfolio:", error);
          }
        }
    };

    useEffect (() => {
        const getPortfolio = async () => {
            const data = await fetchPortfolio();
            console.log(data);
          };
          getPortfolio();
    },[])

  return (
    <div className='homepage'>
        <div className='home_topholder'>
            <div className='home_personal_metric'>
                <div>
                    <p>Total Assets</p>
                    <p>$53,000<span> +21%</span></p>
                </div>
                <img src={money} alt="money" srcset="" />
            </div>
            <div className='home_personal_metric'>
                <div>
                    <p>Today's Gain</p>
                    <p>$29,150<span> +55%</span></p>
                </div>
                <img src={world} alt="money" srcset="" />
            </div>
            <div className='home_personal_metric'>
                <div>
                    <p>ROI's</p>
                    <p>$51,000<span> +33%</span></p>
                </div>
                <img src={document} alt="money" srcset="" />
            </div>
            <div className='home_personal_metric'>
                <div>
                    <p>Total Loss</p>
                    <p>$11,254<span style={{color: "#E31A1A"}}> -11%</span></p>
                </div>
                <img src={money} alt="money" srcset="" />
            </div>
        </div>
        <div className='home_content_row'>
            <div className='user_idcard'>
                <div>
                    <p>Welcome back,</p>
                    <h1>Mark Johnson</h1>
                    <p>Glad to see you again!</p>
                    <p>Step into the future.</p>
                </div>
            </div>
            <PredictionPanel logo={btc} name="Bitcoin (BTC)" confidence="92"/>
            <PredictionPanel logo={eth} name="Etherium (ETH)" confidence="95"/>
        </div>
        <div className='home_content_row'>
                <TradingTable />
                <PredictionPanel logo={solana} name="Solana (SOL)" confidence="89"/>
        </div>
    </div>
  )
}

export default Homepage