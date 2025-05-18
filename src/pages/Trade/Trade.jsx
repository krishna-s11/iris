import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CoinList from '../../components/Trade/CoinList/CoinList';
import CoinDetail from '../../components/Trade/CoinDetails/CoinDetails';
import TradingSimulator from '../../components/Trade/TradingSimulator/TradingSimulator';
import './trade.css';

const coinIds = 'bitcoin,ethereum,solana,cardano,ripple,dogecoin';

const Trade = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const chartCache = useRef({});
  const [selectedTimeframe, setSelectedTimeframe] = useState('7');

  // Fetch coin list
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              ids: coinIds,
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(response.data);
        setSelectedCoin(response.data[0]);
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };

    fetchCoins();
  }, []);

  // Fetch chart data
  const fetchChartData = async (coinId, days) => {
    const key = `${coinId}-${days}`;
    if (chartCache.current[key]) {
      setChartData(chartCache.current[key]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days,
            interval: days === '1' ? 'hourly' : 'daily',
          },
        }
      );
      chartCache.current[key] = response.data;
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when coin or timeframe changes
  useEffect(() => {
    if (selectedCoin) {
      fetchChartData(selectedCoin.id, selectedTimeframe);
    }
  }, [selectedCoin, selectedTimeframe]);

  return (
    <div className="crypto-dashboard">
      <CoinDetail
        coin={selectedCoin}
        chartData={chartData}
        loading={loading}
        selectedTimeframe={selectedTimeframe}
        onTimeframeChange={setSelectedTimeframe}
      />
      <CoinList coins={coins} selectedCoin={selectedCoin} onSelect={setSelectedCoin} />
      <TradingSimulator />
    </div>
  );
};

export default Trade;
