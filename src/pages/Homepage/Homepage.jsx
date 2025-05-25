import React, { useEffect, useState } from 'react';
import "./homepage.css";
import money from "../../assets/money1.png";
import btc from "../../assets/btc.png";
import eth from "../../assets/eth.png";
import solana from "../../assets/solana.png";
import world from "../../assets/world.svg";
import api from "../../api/api";
import PredictionPanel from '../../components/Home/PredictionPanel/PredictionPanel';
import TradingTable from '../../components/Home/TradingTable/TradingTable';
import OrdersOverview from '../../components/Home/OrdersOverview/OrdersOverview';
import { Ripple } from '../../components/magicui/ripple';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import useIsWalletConnected from '../../hooks/useIsWalletConnected';

const cache = {
  get: (key, maxAgeMinutes = 10) => {
    const item = sessionStorage.getItem(key);
    if (!item) return null;

    try {
      const parsed = JSON.parse(item);
      const now = Date.now();
      if (now - parsed.timestamp > maxAgeMinutes * 60 * 1000) {
        sessionStorage.removeItem(key);
        return null;
      }
      return parsed.data;
    } catch {
      return null;
    }
  },

  set: (key, data) => {
    sessionStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  }
};



const Homepage = () => {
  const isWallet = useIsWalletConnected();
  const [userName, setUserName] = useState("");
  const [portfolioData, setPortfolioData] = useState(null);
  const [userTimeseries, setUserTimeseries] = useState(null);
  const [signals, setSignals] = useState(null);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [userFetched, setUserFetched] = useState(false);
  const [portfolioFetched, setPortfolioFetched] = useState(false);
  const [timeseriesFetched, setTimeseriesFetched] = useState(false);



  const coinImages = [btc, eth, solana];

  const defaultPortfolio = [
    { coin: "Bitcoin", amount: 0, gain_loss_percentage: 0 },
    { coin: "Ethereum", amount: 0, gain_loss_percentage: 0 },
    { coin: "Solana", amount: 0, gain_loss_percentage: 0 }
  ];

  const displayedPortfolio = portfolioData?.portfolio_summary?.length
    ? portfolioData.portfolio_summary
    : defaultPortfolio;


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await api.get("/auth/userinfo");
        setUserName(res.data?.username || "User");
      } catch (err) {
        console.error("User info fetch failed", err);
      } finally {
        setUserFetched(true);
      }
    };

    fetchUserInfo();

    if (!isWallet) return;

    // Load from cache immediately to show on first render
    const timeseriesCache = cache.get("portfolio_timeseries");
    if (timeseriesCache) {
      setUserTimeseries(timeseriesCache);
      setLoadingChart(false);
      setTimeseriesFetched(true);
    }
    
    const summaryCache = cache.get("portfolio_summary");
    if (summaryCache) {
      setPortfolioData(summaryCache);
      setLoadingPortfolio(false);
      setPortfolioFetched(true);
    }

    // Fetch in background if no cache (or stale)
    if (!timeseriesCache) {
      setLoadingChart(true);
      api.get("/portfolio/timeseries")
        .then(res => {
          setUserTimeseries(res.data);
          cache.set("portfolio_timeseries", res.data);
        })
        .catch(err => {
          console.error("Timeseries fetch failed", err);
          setUserTimeseries(null);
        })
        .finally(() => {
          setTimeseriesFetched(true);
          setLoadingChart(false);
        });
    }

    if (!summaryCache) {
      setLoadingPortfolio(true);
      api.get("/portfolio/summary")
        .then(res => {
          setPortfolioData(res.data);
          cache.set("portfolio_summary", res.data);
        })
        .catch(err => {
          console.error("Portfolio fetch failed", err);
          setPortfolioData(null);
        })
        .finally(() => {
          setPortfolioFetched(true);
          setLoadingPortfolio(false);
        });
    }
  }, [isWallet]);

  useEffect(() => {
    if (!(userFetched && portfolioFetched && timeseriesFetched)) return;

    const signalCache = cache.get("trading_signals");
    if (signalCache) {
      setSignals(signalCache);
      return;
    }

    api.get("/trading/signals/latest")
      .then(res => {
        const clean = Array.isArray(res.data) ? res.data : [];
        setSignals(clean);
        cache.set("trading_signals", clean);
      })
      .catch(err => {
        console.error("Signals fetch failed", err);
        setSignals([]);
      });
  }, [userFetched, portfolioFetched, timeseriesFetched]);


  return (
    <div className='homepage'>
      <div className='home_topholder'>
        <div className='home_personal_metric'>
          <div>
            <p>Total Assets</p>
            <p>
              {loadingPortfolio ? (
                <span className="spinner-text">Loading...</span>
              ) : (
                <>
                  ${portfolioData?.total_value_usd?.toFixed(2) || 0}
                  <span> {portfolioData ? `${portfolioData.overall_gain_loss_percentage.toFixed(2)}%` : '+0%'}</span>
                </>
              )}
            </p>
          </div>
          <img src={money} alt="money" />
        </div>

        {displayedPortfolio.map((coin, index) => (
          <div className='home_personal_metric' key={index}>
            <div>
              <p>{coin.coin} Balance</p>
              <p>
                {loadingPortfolio ? (
                  <span className="spinner-text">Loading...</span>
                ) : (
                  <>
                    ${coin.amount?.toFixed?.(2) || 0}
                    <span> {coin.gain_loss_percentage?.toFixed?.(2) || 0}%</span>
                  </>
                )}
              </p>
            </div>
            <img src={coinImages[index] || world} alt={coin.coin} />
          </div>
        ))}
      </div>

      <div className='home_content_row'>
        <div className='user_idcard'>
          <div className="ripple-container">
            <Ripple mainCircleSize={40} mainCircleOpacity={0.7} numCircles={8} />
          </div>
          <div className="user_idcard_content">
            <p style={{ color: "#CBD5E0" }}>Welcome back,</p>
            <h1 style={{ color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>{userName}</h1>
            <p style={{ color: "#CBD5E0" }}>Glad to see you again!</p>
            <p style={{ color: "#CBD5E0" }}>Step into the future.</p>
          </div>
        </div>

        <div className='user_chart'>
          <h1>User's Statistics</h1>
          <div style={{ width: '100%', height: '100%' }}>
            {loadingChart ? (
              <div className="chart-spinner">Loading chart...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userTimeseries?.length ? userTimeseries : [{ name: '', Gain: null, Loss: null }]} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#56577A" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Loss" stroke="#82ca9d" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Gain" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className='home_content_row prediction_panel_holder'>
        {(signals?.length > 0 ? signals : [
          { coin: 'Bitcoin (BTC)', Confidence: '-', signal: '-', Direction: '-' },
          { coin: 'Ethereum (ETH)', Confidence: '-', signal: '-', Direction: '-' },
          { coin: 'Solana (SOL)', Confidence: '-', signal: '-', Direction: '-' }
        ]).map((signal, index) => {
          const logo = signal.coin?.toLowerCase()?.includes('btc') ? btc
            : signal.coin?.toLowerCase()?.includes('eth') ? eth
            : signal.coin?.toLowerCase()?.includes('sol') ? solana
            : world;

          return (
            <PredictionPanel
              key={index}
              logo={logo}
              name={signal.coin || `Coin ${index + 1}`}
              confidence={signal.Confidence || '-'}
              signal={signal['Signal Date'] || '-'}
              direction={signal.Direction || '-'}
            />
          );
        })}
      </div>

      <div className='home_content_row'>
        <TradingTable />
        <OrdersOverview />
      </div>
    </div>
  );
};

export default Homepage;
