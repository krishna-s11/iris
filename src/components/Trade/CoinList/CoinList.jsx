import React from 'react';
import './coinList.css';

const CoinList = ({ coins, selectedCoin, onSelect }) => {
  return (
    <div className="coin-list">
      <h2 className="coin-list-heading">Select a Currency</h2>
      <div className="coins-scroll">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className={`coin-item ${selectedCoin?.id === coin.id ? 'active' : ''}`}
            onClick={() => onSelect(coin)}
          >
            <img src={coin.image} alt={coin.name} className="coin-logo-small" />
            <span>{coin.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinList;
