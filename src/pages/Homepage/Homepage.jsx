import React, { useEffect,useState } from 'react'
import "./homepage.css";
import money from "../../assets/money1.png";
import world from "../../assets/world.svg";
import document from "../../assets/document.svg";
import api from "../../api/api";
import PredictionPanel from '../../components/Home/PredictionPanel/PredictionPanel';
import btc from "../../assets/btc.png";
import eth from "../../assets/eth.png";
import solana from "../../assets/solana.png";
import TradingTable from '../../components/Home/TradingTable/TradingTable';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import OrdersOverview from '../../components/Home/OrdersOverview/OrdersOverview';
import { Ripple } from '../../components/magicui/ripple';

const Homepage = () => {

    const [userName, setUserName] = useState("");

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

    const fetchUserInfo = async () => {
      try {
          const response = await api.get("/auth/userinfo");
          setUserName(response.data?.username || "User");
      } catch (error) {
          console.error("Failed to fetch user info:", error);
      }
    };

    useEffect (() => {
        const getPortfolio = async () => {
            const data = await fetchPortfolio();
            console.log(data);
          };
          getPortfolio();
          fetchUserInfo();
    },[])

    const data = [
        {
          name: '01/05',
          Gain: 4000,
          Loss: 2400,
          amt: 2400,
        },
        {
          name: '02/05',
          Gain: 3000,
          Loss: 1398,
          amt: 2210,
        },
        {
          name: '03/05',
          Gain: 2000,
          Loss: 9800,
          amt: 2290,
        },
        {
          name: '04/05',
          Gain: 2780,
          Loss: 3908,
          amt: 2000,
        },
        {
          name: '05/05',
          Gain: 1890,
          Loss: 4800,
          amt: 2181,
        },
        {
          name: '06/05',
          Gain: 2390,
          Loss: 3800,
          amt: 2500,
        },
        {
          name: '07/05',
          Gain: 3490,
          Loss: 4300,
          amt: 2100,
        },
      ];

  return (
    <div className='homepage'>
        <div className='home_topholder'>
            <div className='home_personal_metric'>
                <div>
                    <p>Total Assets</p>
                    <p>$53,000<span> +21%</span></p>
                </div>
                <img src={money} style={{borderRadius: "11px"}} alt="money" srcset="" />
            </div>
            <div className='home_personal_metric'>
                <div>
                    <p>Bitcoin (BTC)</p>
                    <p>$2400<span style={{color: "#E31A1A"}}>-13%</span></p>
                </div>
                <img src={btc} alt="btc" srcset="" />
            </div>
            <div className='home_personal_metric'>
                <div>
                    <p>Ethereum (ETH)</p>
                    <p>$1900<span> +8%</span></p>
                </div>
                <img src={eth} alt="money" srcset="" />
            </div>
            <div className='home_personal_metric'>
                <div>
                    <p>Solana (SOL)</p>
                    <p>$1180.8<span style={{color: "#E31A1A"}}> -16%</span></p>
                </div>
                <img src={solana} alt="money" srcset="" />
            </div>
        </div>
        <div className='home_content_row'>
            <div className='user_idcard'>
                <div className="ripple-container">
                    <Ripple 
                        mainCircleSize={40} 
                        mainCircleOpacity={0.7} 
                        numCircles={8} 
                    />
                </div>
                <div className="user_idcard_content">
                    <p style={{color: "#CBD5E0"}}>Welcome back,</p>
                    <h1 style={{color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.3)"}}>{userName}</h1>
                    <p style={{color: "#CBD5E0"}}>Glad to see you again!</p>
                    <p style={{color: "#CBD5E0"}}>Step into the future.</p>
                </div>
            </div>
            <div className='user_chart'>
              <h1>User's Statistics</h1>
              <div style={{ width: '100%', height: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data}
                    margin={{
                      top: 5,
                      right: 0,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#56577A" />
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Loss" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Gain" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
        </div>
        <div className='home_content_row prediction_panel_holder'>
                <PredictionPanel logo={btc} name="Bitcoin (BTC)" confidence="92"/>
                <PredictionPanel logo={eth} name="Ethereum (ETH)" confidence="95"/>
                <PredictionPanel logo={solana} name="Solana (SOL)" confidence="89"/>
        </div>
        <div className='home_content_row'>
                <TradingTable />
                <OrdersOverview />
        </div>
    </div>
  )
}

export default Homepage