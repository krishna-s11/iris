import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip as ChartTooltip,
  Filler
} from 'chart.js';
import { ClipLoader } from 'react-spinners';
import './coinDetails.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ChartTooltip, Filler);

const timeframes = [
  { label: '7D', value: '7' },
  { label: '30D', value: '30' },
  { label: '90D', value: '90' },
];

const CoinDetail = ({ coin, chartData, loading, selectedTimeframe, onTimeframeChange }) => {
  if (!coin) return null;

  const data = {
    labels: chartData?.prices.map((price) => new Date(price[0]).toLocaleDateString()) || [],
    datasets: [
      {
        label: `${coin.name} Price (USD)`,
        data: chartData?.prices.map((price) => price[1]) || [],
        fill: true,
        backgroundColor: 'rgba(59,0,211,0.1)',
        borderColor: '#3d0adc',
        tension: 0.4,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: '#ccc' },
        grid: { color: '#2b2b2b' },
      },
      y: {
        ticks: { color: '#ccc' },
        grid: { color: '#2b2b2b' },
      },
    },
    plugins: {
      legend: {
        labels: { color: '#fff' },
      },
      tooltip: {
        backgroundColor: '#222',
        titleColor: '#fff',
        bodyColor: '#eee',
      },
    },
  };

  return (
    <div className="coin-detail">
      <div className="coin-header">
        <img src={coin.image} alt={coin.name} className="coin-logo-large" />
        <h2>{coin.name}</h2>
      </div>

      <div className="coin-metadata">
        <p>💰 Market Cap: ${coin.market_cap.toLocaleString()}</p>
        <p>📊 Volume (24h): ${coin.total_volume.toLocaleString()}</p>
        <p>📈 Price: ${coin.current_price.toFixed(2)}</p>
      </div>

      <div className="timeframe-selector">
        {timeframes.map((t) => (
          <button
            key={t.value}
            className={`timeframe-btn ${selectedTimeframe === t.value ? 'active' : ''}`}
            onClick={() => onTimeframeChange(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loader-wrapper">
            <ClipLoader size={50} color="#3d0adc" />
        </div>
      ) : (
        <div className="chart-container">
          <Line data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default CoinDetail;
